from beanie import Document
from pydantic import Field
from typing import Optional, List
from datetime import datetime

class BlogPost(Document):
    title: str
    slug: str
    excerpt: str
    content: str
    category: str
    author: str = "Soumyashi Power Team"
    image_url: Optional[str] = None
    tags: List[str] = []
    is_published: bool = True
    published_at: Optional[datetime] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = None

    class Settings:
        name = "blog_posts"
        indexes = ["slug", "category", "is_published"]
