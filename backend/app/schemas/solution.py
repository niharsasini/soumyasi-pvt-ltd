from pydantic import BaseModel
from typing import Optional

class SolutionBase(BaseModel):
    slug: str
    title: str
    category: Optional[str] = None
    description: Optional[str] = None
    icon: Optional[str] = None

class SolutionCreate(SolutionBase):
    pass

class SolutionOut(SolutionBase):
    id: int

    class Config:
        from_attributes = True
