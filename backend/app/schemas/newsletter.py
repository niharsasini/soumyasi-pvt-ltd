from pydantic import BaseModel, EmailStr
from typing import Optional

class NewsletterCreate(BaseModel):
    email: EmailStr

class NewsletterResponse(BaseModel):
    success: bool
    message: str
    id: Optional[str] = None
