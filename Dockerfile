# Multi-stage build for React + Vite application
# Using Alpine base + manual nginx installation to avoid entrypoint issues
# Cache-bust: 2024-02-06-002

# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci && npm cache clean --force
COPY . .
RUN npm run build

# Stage 2: Production - Alpine with nginx
FROM alpine:3.19

# Install nginx and envsubst
RUN apk add --no-cache nginx gettext

# Setup nginx directories
RUN mkdir -p /run/nginx /var/log/nginx /var/lib/nginx/tmp /etc/nginx/conf.d /usr/share/nginx/html

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config template
COPY nginx.conf /etc/nginx/conf.d/default.conf.template

# Create main nginx config
RUN cat > /etc/nginx/nginx.conf << 'EOF'
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';
    access_log /var/log/nginx/access.log main;
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    include /etc/nginx/conf.d/*.conf;
}
EOF

# Create entrypoint script
RUN cat > /entrypoint.sh << 'EOF'
#!/bin/sh
set -e
export PORT="${PORT:-80}"
echo "=== Conspiracy Generator ==="
echo "Starting on port: $PORT"
envsubst '$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf
echo "Nginx config:"
cat /etc/nginx/conf.d/default.conf
echo "========================"
exec nginx -g "daemon off;"
EOF
RUN chmod +x /entrypoint.sh

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:${PORT:-80}/ || exit 1

CMD ["/entrypoint.sh"]
