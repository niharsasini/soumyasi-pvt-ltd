from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from app.database import Base

class Solution(Base):
    __tablename__ = "solutions"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(150), unique=True, nullable=False, index=True)
    title = Column(String(200), nullable=False)
    category = Column(String(100), nullable=True)
    description = Column(Text, nullable=True)
    icon = Column(String(50), nullable=True)
    created_at = Column(DateTime(timezone=True),
                        server_default=func.now())
