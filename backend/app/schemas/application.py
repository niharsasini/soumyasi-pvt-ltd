from pydantic import BaseModel, EmailStr
from typing import Optional

class ApplicationCreate(BaseModel):
    job_id: int
    name: str
    email: EmailStr
    phone: Optional[str] = None
    resume_url: Optional[str] = None

class ApplicationOut(ApplicationCreate):
    id: int
    status: str = "new"

    class Config:
        from_attributes = True
