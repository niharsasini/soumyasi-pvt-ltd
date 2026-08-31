from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.ev_station import EVStation

router = APIRouter()

@router.get("/")
async def get_all_stations(db: Session = Depends(get_db)):
    """Get all EV charging stations for the map"""
    stations = db.query(EVStation).filter(
        EVStation.is_active == True
    ).all()
    return stations

@router.get("/{station_id}")
async def get_station(
    station_id: int,
    db: Session = Depends(get_db)
):
    """Get single EV station details"""
    station = db.query(EVStation).filter(
        EVStation.id == station_id
    ).first()
    return station
