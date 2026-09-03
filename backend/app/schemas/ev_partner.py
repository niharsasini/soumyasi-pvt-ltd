from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class EVPartnerCreate(BaseModel):
    name: str
    phone: str
    email: EmailStr
    location_type: str
    address: str
    google_maps_link: Optional[str] = None
    city: str
    available_space: Optional[str] = None
    electrical_connection: Optional[str] = None
    message: Optional[str] = None

class EVPartnerResponse(BaseModel):
    success: bool
    message: str
    id: Optional[str] = None

class EVPartnerUpdate(BaseModel):
    status: Optional[str] = None
    admin_notes: Optional[str] = None
    assigned_to: Optional[str] = None
    follow_up_date: Optional[datetime] = None
