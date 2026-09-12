from beanie import Document
from pydantic import Field
from typing import Optional
from datetime import datetime

class GalleryItem(Document):
    title: str
    category: str
    subcategory: str
    location: str
    image_url: str
    capacity: Optional[str] = None
    description: Optional[str] = None
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        name = "gallery_items"
        indexes = ["category", "is_active"]
