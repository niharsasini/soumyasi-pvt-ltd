from pydantic import BaseModel, EmailStr
from typing import Optional

class ApplicationCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    resume_url: Optional[str] = None
    cover_letter: Optional[str] = None

class ApplicationResponse(BaseModel):
    success: bool
    message: str
    id: Optional[str] = None
