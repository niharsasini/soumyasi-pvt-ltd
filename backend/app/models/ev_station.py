from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime
from sqlalchemy.sql import func
from app.database import Base

class EVStation(Base):
    __tablename__ = "ev_stations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    city = Column(String(100), nullable=False)
    address = Column(String(500), nullable=False)
    lat = Column(Float, nullable=False)
    lng = Column(Float, nullable=False)
    charger_type = Column(String(50), default="Fast")
    power_kw = Column(Integer, default=60)
    status = Column(String(20), default="Active")
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True),
                        server_default=func.now())
