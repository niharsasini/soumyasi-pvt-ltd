from pydantic import BaseModel
from typing import Optional

class EVStationBase(BaseModel):
    name: str
    city: str
    address: str
    lat: float
    lng: float
    charger_type: str = "Fast"
    power_kw: int = 60
    status: str = "Active"

class EVStationCreate(EVStationBase):
    pass

class EVStationOut(EVStationBase):
    id: int
    is_active: bool = True

    class Config:
        from_attributes = True
