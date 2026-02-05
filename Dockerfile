# Multi-stage build for React + Vite application
# Optimized for Railway deployment

# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci && npm cache clean --force

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production with Nginx
FROM nginx:alpine

# Remove default entrypoint scripts to prevent auto-configuration
RUN rm -rf /docker-entrypoint.d/* /docker-entrypoint.sh

# Install envsubst
RUN apk add --no-cache gettext

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config template
COPY nginx.conf /etc/nginx/conf.d/default.conf.template

# Create custom entrypoint script
RUN printf '%s\n' \
    '#!/bin/sh' \
    'set -e' \
    'export PORT="${PORT:-80}"' \
    'echo "=== Starting Conspiracy Generator ==="' \
    'echo "Port: $PORT"' \
    'envsubst '\''$PORT'\'' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf' \
    'echo "Nginx config generated:"' \
    'cat /etc/nginx/conf.d/default.conf' \
    'echo "=== Starting Nginx ==="' \
    'exec nginx -g "daemon off;"' \
    > /entrypoint.sh && chmod +x /entrypoint.sh

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:${PORT:-80}/ || exit 1

ENTRYPOINT ["/entrypoint.sh"]
t_type application/octet-stream;' >> /etc/nginx/nginx.conf && \
    echo '    log_format main '\''$remote_addr - $remote_user [$time_local] "$request" '\'' >> /etc/nginx/nginx.conf && \
    echo '                      '\''$status $body_bytes_sent "$http_referer" '\'' >> /etc/nginx/nginx.conf && \
    echo '                      '\''"$http_user_agent" "$http_x_forwarded_for";'\'' >> /etc/nginx/nginx.conf && \
    echo '    access_log /var/log/nginx/access.log main;' >> /etc/nginx/nginx.conf && \
    echo '    sendfile on;' >> /etc/nginx/nginx.conf && \
    echo '    tcp_nopush on;' >> /etc/nginx/nginx.conf && \
    echo '    tcp_nodelay on;' >> /etc/nginx/nginx.conf && \
    echo '    keepalive_timeout 65;' >> /etc/nginx/nginx.conf && \
    echo '    types_hash_max_size 2048;' >> /etc/nginx/nginx.conf && \
    echo '    include /etc/nginx/conf.d/*.conf;' >> /etc/nginx/nginx.conf && \
    echo '}' >> /etc/nginx/nginx.conf

# Create startup script
RUN printf '%s\n' \
    '#!/bin/sh' \
    'export PORT="${PORT:-80}"' \
    'echo "Starting nginx on port $PORT"' \
    'envsubst '\''$PORT'\'' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf' \
    'cat /etc/nginx/conf.d/default.conf' \
    'nginx -g "daemon off;"' \
    > /start.sh && chmod +x /start.sh

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:${PORT:-80}/ || exit 1

CMD ["/start.sh"]
