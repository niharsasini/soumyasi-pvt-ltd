from beanie import Document
from pydantic import Field
from typing import Optional, List
from datetime import datetime
from enum import Enum

class ProjectCategory(str, Enum):
    SOLAR = "Solar"
    EV = "EV"
    WIND = "Wind"
    INDUSTRIAL = "Industrial"

class Project(Document):
    title: str
    slug: str
    category: ProjectCategory
    location: str
    city: str
    capacity: Optional[str] = None
    description: str
    highlights: List[str] = []
    image_url: Optional[str] = None
    images: List[str] = []
    completed_date: Optional[str] = None
    status: str = "Completed"
    is_published: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        name = "projects"
        indexes = ["slug", "category", "is_published"]
