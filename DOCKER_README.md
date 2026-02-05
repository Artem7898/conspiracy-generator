# 🐳 Docker для Генератора Теорий Заговора

Полная Docker-конфигурация для фронтенда (React + Nginx) и бэкенда (Python FastAPI).

## Архитектура

```
┌─────────────────┐     ┌─────────────────┐
│   Frontend      │────▶│    Backend      │
│  React + Nginx  │     │  Python FastAPI │
│    Port 3000    │     │    Port 8000    │
└─────────────────┘     └─────────────────┘
```

## Быстрый старт

### Запуск обоих сервисов

```bash
# Сборка и запуск всех сервисов
docker-compose up -d

# Приложения будут доступны:
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

### Только Frontend

```bash
# Сборка образа
docker build -t conspiracy-frontend .

# Запуск контейнера
docker run -d -p 3000:80 --name conspiracy-frontend conspiracy-frontend
```

### Только Backend

```bash
cd backend

# Сборка образа
docker build -t conspiracy-backend .

# Запуск контейнера
docker run -d -p 8000:8000 --name conspiracy-backend conspiracy-backend
```

## Команды управления

### Docker Compose

```bash
# Запуск в фоновом режиме
docker-compose up -d

# Просмотр логов всех сервисов
docker-compose logs -f

# Логи конкретного сервиса
docker-compose logs -f frontend
docker-compose logs -f backend

# Остановка
docker-compose down

# Пересборка после изменений
docker-compose up -d --build

# Полная очистка
docker-compose down --rmi all --volumes
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `http://localhost:8000/` | GET | Информация об API |
| `http://localhost:8000/health` | GET | Health check |
| `http://localhost:8000/organizations` | GET | Список организаций |
| `http://localhost:8000/generate` | POST | Сгенерировать теорию |
| `http://localhost:8000/random` | GET | Случайная теория |
| `http://localhost:8000/docs` | GET | Swagger UI |
| `http://localhost:8000/redoc` | GET | ReDoc документация |

## Структура проекта

```
.
├── Dockerfile                 # Frontend Dockerfile
├── docker-compose.yml         # Compose конфигурация
├── nginx.conf                 # Nginx конфигурация
├── .dockerignore              # Исключения Docker
├── DOCKER_README.md           # Этот файл
├── backend/
│   ├── Dockerfile             # Backend Dockerfile
│   ├── requirements.txt       # Python зависимости
│   ├── app.py                 # FastAPI приложение
│   └── README.md              # Документация бэкенда
└── src/                       # Исходный код React
```

## Конфигурация

### Изменение портов

**docker-compose.yml:**
```yaml
services:
  frontend:
    ports:
      - "8080:80"  # Frontend на http://localhost:8080
  
  backend:
    ports:
      - "9000:8000"  # Backend на http://localhost:9000
```

### Environment Variables

**Backend:**
```yaml
services:
  backend:
    environment:
      - PYTHONUNBUFFERED=1
      - API_KEY=your-secret-key
```

## Оптимизации

### Frontend
- ✅ Многоэтапная сборка (Node.js → Nginx)
- ✅ Gzip-сжатие
- ✅ Кэширование статики
- ✅ Размер образа ~25-30 МБ

### Backend
- ✅ Лёгкий Python 3.11 slim
- ✅ FastAPI для высокой производительности
- ✅ Автоматическая документация
- ✅ Размер образа ~150 МБ

## Health Checks

Оба сервиса имеют настроенные health checks:

```bash
# Frontend
docker inspect --format='{{.State.Health.Status}}' conspiracy-frontend

# Backend
docker inspect --format='{{.State.Health.Status}}' conspiracy-backend
```

## Troubleshooting

### Порт занят

```bash
# Найти процесс
lsof -i :3000
lsof -i :8000

# Или изменить порты в docker-compose.yml
```

### Пересборка с нуля

```bash
# Полная очистка и пересборка
docker-compose down --rmi all --volumes
docker-compose up -d --build
```

### Проверка логов

```bash
# Все логи
docker-compose logs

# Только ошибки
docker-compose logs --tail=100 | grep ERROR

# Последние 50 строк
docker-compose logs --tail=50 -f
```

## Размеры образов

```bash
# Проверить размеры
docker images | grep conspiracy

# Обычно:
# conspiracy-frontend: ~25-30 MB
# conspiracy-backend:  ~150 MB
```

## Production Deployment

### С использованием переменных окружения

```bash
# Создать .env файл
cat > .env << EOF
FRONTEND_PORT=80
BACKEND_PORT=8000
BACKEND_HOST=0.0.0.0
EOF

# Запуск с env файлом
docker-compose --env-file .env up -d
```

### Reverse Proxy (Nginx/Traefik)

Для production рекомендуется добавить reverse proxy перед сервисами.

## Полезные команды

```bash
# Список контейнеров
docker ps

# Использование ресурсов
docker stats

# Очистка неиспользуемых образов
docker image prune -a

# Очистка всего
docker system prune -a --volumes
```
