from pydantic import BaseModel
from typing import Optional

class JobBase(BaseModel):
    title: str
    department: Optional[str] = None
    location: Optional[str] = None
    employment_type: Optional[str] = None
    description: Optional[str] = None

class JobCreate(JobBase):
    pass

class JobOut(JobBase):
    id: int
    is_active: bool = True

    class Config:
        from_attributes = True
