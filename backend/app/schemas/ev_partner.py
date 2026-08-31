from pydantic import BaseModel
from typing import Optional

class EVPartnerCreate(BaseModel):
    name: str
    phone: str
    location_type: str
    city: str
    message: Optional[str] = None

class EVPartnerResponse(BaseModel):
    success: bool
    message: str
    id: Optional[int] = None
