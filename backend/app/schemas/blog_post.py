from pydantic import BaseModel
from typing import Optional, List

class BlogPostBase(BaseModel):
    slug: str
    title: str
    excerpt: str
    content: str
    category: str
    author: str = "Soumyashi Power Team"
    image_url: Optional[str] = None
    tags: List[str] = []

class BlogPostCreate(BlogPostBase):
    pass

class BlogPostOut(BlogPostBase):
    id: str
    is_published: bool = True

    class Config:
        from_attributes = True
