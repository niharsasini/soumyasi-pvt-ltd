from pydantic import BaseModel
from typing import Optional

class BlogPostBase(BaseModel):
    slug: str
    title: str
    excerpt: Optional[str] = None
    content: Optional[str] = None
    cover_image: Optional[str] = None
    author: Optional[str] = None

class BlogPostCreate(BlogPostBase):
    pass

class BlogPostOut(BlogPostBase):
    id: int
    published: str = "draft"

    class Config:
        from_attributes = True
