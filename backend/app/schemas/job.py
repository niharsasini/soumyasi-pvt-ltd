from pydantic import BaseModel
from typing import Optional

class JobBase(BaseModel):
    title: str
    department: str
    location: str
    job_type: str = "Full Time"
    description: str
    requirements: str
    salary_range: Optional[str] = None

class JobCreate(JobBase):
    slug: str

class JobOut(JobBase):
    id: str
    slug: str
    is_active: bool = True

    class Config:
        from_attributes = True
