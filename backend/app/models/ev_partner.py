from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.sql import func
from app.database import Base

class EVPartnerEnquiry(Base):
    __tablename__ = "ev_partner_enquiries"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    phone = Column(String(20), nullable=False)
    location_type = Column(String(100), nullable=False)
    city = Column(String(100), nullable=False)
    message = Column(Text, nullable=True)
    status = Column(String(20), default="new")
    created_at = Column(DateTime(timezone=True),
                        server_default=func.now())
