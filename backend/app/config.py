from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    APP_NAME: str = "Soumyashi Power API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False
    SECRET_KEY: str
    ALLOWED_ORIGINS: List[str] = [
        "https://soumyashipower.in",
        "https://www.soumyashipower.in"
    ]

    DATABASE_URL: str
    REDIS_URL: str = "redis://localhost:6379"

    SMTP_HOST: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    SMTP_USER: str
    SMTP_PASSWORD: str
    EMAIL_FROM: str
    EMAIL_FROM_NAME: str = "Soumyashi Power"

    ADMIN_EMAIL: str
    ADMIN_PHONE: str = "+919437611129"

    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRE_MINUTES: int = 1440

    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
