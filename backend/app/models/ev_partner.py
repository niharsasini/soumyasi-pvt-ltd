from beanie import Document
from pydantic import EmailStr, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum

class EVPartnerStatus(str, Enum):
    NEW = "new"
    CALLED = "called"
    SITE_VISIT_SCHEDULED = "site_visit_scheduled"
    SITE_VISIT_DONE = "site_visit_done"
    AGREEMENT_SENT = "agreement_sent"
    APPROVED = "approved"
    REJECTED = "rejected"
    ON_HOLD = "on_hold"

class EVPartnerApplication(Document):
    # Personal
    name: str
    phone: str
    email: EmailStr
    # Location
    location_type: str
    address: str
    google_maps_link: Optional[str] = None
    city: str
    district: Optional[str] = None
    # Technical
    available_space: Optional[str] = None
    electrical_connection: Optional[str] = None
    # Documents (Cloudinary URLs)
    revenue_patta_url: Optional[str] = None
    revenue_map_url: Optional[str] = None
    land_papers_url: Optional[str] = None
    # Admin
    status: EVPartnerStatus = EVPartnerStatus.NEW
    admin_notes: Optional[str] = None
    assigned_to: Optional[str] = None
    follow_up_date: Optional[datetime] = None
    message: Optional[str] = None
    # Meta
    ip_address: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = None

    class Settings:
        name = "ev_partner_applications"
        indexes = ["status", "city", "created_at"]
