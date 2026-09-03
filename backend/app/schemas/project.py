from pydantic import BaseModel
from typing import Optional, List

class ProjectBase(BaseModel):
    slug: str
    title: str
    category: str
    location: str
    city: str
    capacity: Optional[str] = None
    description: str
    highlights: List[str] = []
    image_url: Optional[str] = None

class ProjectCreate(ProjectBase):
    pass

class ProjectOut(ProjectBase):
    id: str
    is_published: bool = True

    class Config:
        from_attributes = True
