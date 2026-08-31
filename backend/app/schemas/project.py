from pydantic import BaseModel
from typing import Optional

class ProjectBase(BaseModel):
    slug: str
    title: str
    location: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None

class ProjectCreate(ProjectBase):
    pass

class ProjectOut(ProjectBase):
    id: int

    class Config:
        from_attributes = True
