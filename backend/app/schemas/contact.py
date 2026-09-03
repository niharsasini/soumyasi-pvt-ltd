from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    service: Optional[str] = None
    message: str

class ContactResponse(BaseModel):
    success: bool
    message: str
    id: Optional[str] = None

class ContactUpdate(BaseModel):
    status: Optional[str] = None
