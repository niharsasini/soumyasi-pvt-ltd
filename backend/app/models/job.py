from beanie import Document
from pydantic import Field
from typing import Optional
from datetime import datetime

class Job(Document):
    title: str
    slug: str
    department: str
    location: str
    job_type: str = "Full Time"
    description: str
    requirements: str
    salary_range: Optional[str] = None
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        name = "jobs"
        indexes = ["is_active"]
