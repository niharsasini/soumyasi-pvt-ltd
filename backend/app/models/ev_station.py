from beanie import Document
from pydantic import Field
from typing import Optional, List
from datetime import datetime
from enum import Enum

class ChargerType(str, Enum):
    FAST = "Fast"
    STANDARD = "Standard"
    ULTRA_FAST = "Ultra Fast"

class StationStatus(str, Enum):
    ACTIVE = "Active"
    COMING_SOON = "Coming Soon"
    MAINTENANCE = "Maintenance"
    INACTIVE = "Inactive"

class EVStation(Document):
    name: str
    city: str
    address: str
    lat: float
    lng: float
    charger_type: ChargerType = ChargerType.FAST
    power_kw: int = 60
    connectors: int = 2
    status: StationStatus = StationStatus.ACTIVE
    operator_name: Optional[str] = None
    operator_phone: Optional[str] = None
    working_hours: str = "24/7"
    amenities: List[str] = []
    image_url: Optional[str] = None
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = None

    class Settings:
        name = "ev_stations"
        indexes = ["city", "status", "is_active"]
