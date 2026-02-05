# 🐍 Python Backend API

FastAPI backend для генератора теорий заговора.

## Установка

```bash
cd backend
pip install -r requirements.txt
```

## Запуск

```bash
# Development
uvicorn app:app --reload --host 0.0.0.0 --port 8000

# Production
uvicorn app:app --host 0.0.0.0 --port 8000
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Информация об API |
| `/health` | GET | Health check |
| `/organizations` | GET | Список секретных организаций |
| `/generate` | POST | Сгенерировать теорию |
| `/random` | GET | Случайная теория |

## Пример запроса

```bash
curl -X POST "http://localhost:8000/generate" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Иван Иванов",
    "birth_date": "1990-05-15",
    "favorite_color": "чёрный",
    "favorite_animal": "ворон",
    "birth_city": "Москва",
    "lucky_number": "13"
  }'
```

## Ответ

```json
{
  "theory": "СЕКРЕТНЫЕ ДОКУМЕНТЫ ПОКАЗЫВАЮТ:\n\nИВАН ИВАНОВ тайно контролирует иллюминаты...",
  "secret_code": "X7K9-M2P5-L8Q3",
  "generated_at": "2024-01-15T10:30:00",
  "threat_level": "ВЫСОКИЙ"
}
```

## Документация API

После запуска доступна автоматическая документация:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
