from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.sql import func
from app.database import Base

class ContactSubmission(Base):
    __tablename__ = "contact_submissions"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(20), nullable=True)
    service = Column(String(100), nullable=True)
    message = Column(Text, nullable=False)
    status = Column(String(20), default="new")
    created_at = Column(DateTime(timezone=True),
                        server_default=func.now())
    updated_at = Column(DateTime(timezone=True),
                        onupdate=func.now())
