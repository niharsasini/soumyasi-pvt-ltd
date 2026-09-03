from beanie import Document
from pydantic import EmailStr, Field
from typing import Optional
from datetime import datetime
from enum import Enum

class ContactStatus(str, Enum):
    NEW = "new"
    READ = "read"
    RESPONDED = "responded"
    CLOSED = "closed"

class ContactSubmission(Document):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    service: Optional[str] = None
    message: str
    status: ContactStatus = ContactStatus.NEW
    ip_address: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = None

    class Settings:
        name = "contact_submissions"
        indexes = ["email", "status", "created_at"]
