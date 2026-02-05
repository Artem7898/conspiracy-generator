"""
Conspiracy Theory Generator API
FastAPI backend for generating personalized conspiracy theories
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import random
import string
from datetime import datetime

app = FastAPI(
    title="Conspiracy Theory Generator API",
    description="API for generating personalized conspiracy theories",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data models
class TheoryRequest(BaseModel):
    name: str
    birth_date: Optional[str] = None
    favorite_color: Optional[str] = None
    favorite_animal: Optional[str] = None
    birth_city: Optional[str] = None
    lucky_number: Optional[str] = None

class TheoryResponse(BaseModel):
    theory: str
    secret_code: str
    generated_at: str
    threat_level: str

# Data for generating theories
SECRET_ORGANIZATIONS = [
    "мировое правительство",
    "иллюминаты",
    "рептилоиды",
    "масоны 33-го градуса",
    "Бильдербергский клуб",
    "Всемирный экономический форум",
    "тайный космический флот",
    "глубинное государство",
    "фармацевтические магнаты",
    "нефтяные бароны",
    "технологические олигархи",
    "банковские кланы"
]

CONSPIRACY_GOALS = [
    "для контроля над мировыми запасами {resource}",
    "чтобы следить за каждым шагом через {device}",
    "для создания нового мирового порядка",
    "чтобы похитить вашу личную энергию",
    "для массового чипирования населения",
    "чтобы заменить людей клонами",
    "для контроля над погодой",
    "чтобы отравить {food}",
    "для сокрытия существования {creature}",
    "чтобы отключить {technology}"
]

RESOURCES = ["воды", "воздуха", "информации", "времени", "внимания"]
DEVICES = ["5G вышки", "смартфоны", "холодильники", "зубные щётки", "носки"]
FOODS = ["авокадо", "киноа", "кокосовое молоко", "пробиотики", "кале"]
CREATURES = ["НЛО", "йети", "бигфута", "NESSIE", "драконов", "единорогов"]
TECHNOLOGIES = ["интернет", "электричество", "гравитацию", "сон", "воспоминания"]

EVIDENCE = [
    "Это подтверждается отсутствием доказательств обратного!",
    "Все документы уничтожены, что является явным признаком!",
    "Совпадение? Не думаем!",
    "Откройте глаза!",
    "Это очевидно, если подумать!",
    "Никто не отрицает — значит, это правда!",
    "Гугл это скрывает!",
    "Википедия удаляет статьи об этом!"
]

INTRO_PHRASES = [
    "СЕКРЕТНЫЕ ДОКУМЕНТЫ ПОКАЗЫВАЮТ:",
    "РАССЕКРЕЧЕННАЯ ИНФОРМАЦИЯ:",
    "СВИДЕТЕЛИ УТВЕРЖДАЮТ:",
    "АНОНИМНЫЙ ИСТОЧНИК РАСКРЫЛ:",
    "УТЕЧКА ИЗ ПЯТОГО УРОВНЯ ДОПУСКА:",
    "ЗАПИСЬ С ЧЁРНОГО ЯЩИКА:"
]

CONNECTIONS = [
    "тайно контролирует",
    "является главой",
    "основал в {year} году",
    "финансирует из теневого бюджета",
    "руководит через посредников",
    "входит в состав совета директоров",
    "координирует действия"
]

THREAT_LEVELS = ["НИЗКИЙ", "СРЕДНИЙ", "ВЫСОКИЙ", "КРИТИЧЕСКИЙ", "АПОКАЛИПТИЧЕСКИЙ"]

def generate_secret_code() -> str:
    """Generate a random secret code"""
    chars = string.ascii_uppercase + string.digits
    code = ''.join(random.choice(chars) for _ in range(12))
    return f"{code[:4]}-{code[4:8]}-{code[8:]}"

def generate_theory(data: TheoryRequest) -> dict:
    """Generate a personalized conspiracy theory"""
    name = data.name.upper() if data.name else "АНОНИМ"
    color = data.favorite_color or "красный"
    animal = data.favorite_animal or "кот"
    city = data.birth_city or "неизвестный город"
    number = data.lucky_number or "7"
    
    year = 1990
    if data.birth_date:
        try:
            year = datetime.strptime(data.birth_date, "%Y-%m-%d").year
        except:
            year = random.randint(1950, 2010)
    
    intro = random.choice(INTRO_PHRASES)
    org = random.choice(SECRET_ORGANIZATIONS)
    connection = random.choice(CONNECTIONS).replace('{year}', str(year))
    
    goal = random.choice(CONSPIRACY_GOALS)
    goal = goal.replace('{resource}', random.choice(RESOURCES))
    goal = goal.replace('{device}', random.choice(DEVICES))
    goal = goal.replace('{food}', random.choice(FOODS))
    goal = goal.replace('{creature}', random.choice(CREATURES))
    goal = goal.replace('{technology}', random.choice(TECHNOLOGIES))
    
    ev = random.choice(EVIDENCE)
    
    personal_details = [
        f"Ваш любимый цвет ({color}) — это кодовое название секретной операции!",
        f"Ваше тотемное животное ({animal}) — символ организации!",
        f"Город вашего рождения ({city}) — штаб-квартира!",
        f"Ваше счастливое число ({number}) — количество агентов, следящих за вами!",
        "Дата вашего рождения совпадает с датой основания организации!"
    ]
    detail = random.choice(personal_details)
    
    theory = f"{intro}\n\n{name} {connection} {org} {goal}.\n\n{detail}\n\n{ev}"
    
    return {
        "theory": theory,
        "secret_code": generate_secret_code(),
        "generated_at": datetime.now().isoformat(),
        "threat_level": random.choice(THREAT_LEVELS)
    }

@app.get("/")
def root():
    """Root endpoint"""
    return {
        "message": "Conspiracy Theory Generator API",
        "version": "1.0.0",
        "endpoints": {
            "generate": "POST /generate",
            "health": "GET /health",
            "organizations": "GET /organizations"
        }
    }

@app.get("/health")
def health():
    """Health check endpoint"""
    return {"status": "operational", "threat_level": "MONITORING"}

@app.get("/organizations")
def get_organizations():
    """Get list of secret organizations"""
    return {"organizations": SECRET_ORGANIZATIONS}

@app.post("/generate", response_model=TheoryResponse)
def create_theory(request: TheoryRequest):
    """Generate a conspiracy theory"""
    if not request.name:
        raise HTTPException(status_code=400, detail="Name is required")
    
    result = generate_theory(request)
    return TheoryResponse(**result)

@app.get("/random")
def random_theory():
    """Generate a random conspiracy theory"""
    fake_data = TheoryRequest(
        name=random.choice(["АГЕНТ СМИТ", "ИВАНОВ", "ПЬЮ", "МАЙКЛ", "САША"]),
        birth_date="1990-01-01",
        favorite_color=random.choice(["красный", "чёрный", "зелёный", "синий"]),
        favorite_animal=random.choice(["волк", "ворон", "змея", "тигр"]),
        birth_city=random.choice(["Москва", "Нью-Йорк", "Лондон", "Токио"]),
        lucky_number=str(random.randint(1, 99))
    )
    result = generate_theory(fake_data)
    return TheoryResponse(**result)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
