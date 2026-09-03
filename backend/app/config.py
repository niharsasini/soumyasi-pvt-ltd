from pydantic_settings import BaseSettings
from typing import List
from functools import lru_cache

class Settings(BaseSettings):
    # App
    APP_NAME: str = "Soumyashi Power API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False
    SECRET_KEY: str = "change-this"

    # CORS
    ALLOWED_ORIGINS: List[str] = [
        "https://www.soumyashipower.in",
        "https://soumyashipower.in",
        "http://localhost:3000"
    ]

    # MongoDB
    MONGODB_URL: str = "mongodb://localhost:27017"
    MONGODB_DB_NAME: str = "soumyashi_power"

    # JWT
    JWT_SECRET_KEY: str = "change-this"
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRE_HOURS: int = 24

    # Gmail
    GMAIL_USER: str = ""
    GMAIL_APP_PASSWORD: str = ""

    # Admin
    ADMIN_EMAIL: str = "soumyashipower@gmail.com"
    ADMIN_PHONE: str = "+919437611129"
    ADMIN_PHONE2: str = "+917381076808"

    # Cloudinary
    CLOUDINARY_CLOUD_NAME: str = ""
    CLOUDINARY_API_KEY: str = ""
    CLOUDINARY_API_SECRET: str = ""

    # Company
    COMPANY_NAME: str = "Soumyashi Power Limited"
    COMPANY_ADDRESS: str = "MIG-126, Bhimatangi Housing Colony, Bhubaneswar, Odisha 751002"
    COMPANY_WEBSITE: str = "https://www.soumyashipower.in"

    class Config:
        env_file = ".env"
        case_sensitive = True

@lru_cache()
def get_settings():
    return Settings()

settings = get_settings()
