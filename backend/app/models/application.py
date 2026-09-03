from beanie import Document
from pydantic import EmailStr, Field
from typing import Optional
from datetime import datetime
from enum import Enum

class ApplicationStatus(str, Enum):
    NEW = "new"
    REVIEWED = "reviewed"
    SHORTLISTED = "shortlisted"
    REJECTED = "rejected"
    HIRED = "hired"

class JobApplication(Document):
    job_id: str
    job_title: str
    name: str
    email: EmailStr
    phone: str
    resume_url: Optional[str] = None
    cover_letter: Optional[str] = None
    status: ApplicationStatus = ApplicationStatus.NEW
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        name = "job_applications"
        indexes = ["job_id", "status"]
