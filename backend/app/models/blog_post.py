from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from app.database import Base

class BlogPost(Base):
    __tablename__ = "blog_posts"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(150), unique=True, nullable=False, index=True)
    title = Column(String(200), nullable=False)
    excerpt = Column(Text, nullable=True)
    content = Column(Text, nullable=True)
    cover_image = Column(String(500), nullable=True)
    author = Column(String(100), nullable=True)
    published = Column(String(20), default="draft")
    created_at = Column(DateTime(timezone=True),
                        server_default=func.now())
