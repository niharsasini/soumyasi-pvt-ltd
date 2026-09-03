from beanie import Document
from pydantic import Field
from typing import Optional
from datetime import datetime

class AdminUser(Document):
    username: str
    email: str
    hashed_password: str
    full_name: str = "Admin"
    is_active: bool = True
    is_superadmin: bool = False
    last_login: Optional[datetime] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        name = "admin_users"
        indexes = ["username", "email"]
