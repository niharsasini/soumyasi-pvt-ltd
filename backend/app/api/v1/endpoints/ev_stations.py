from fastapi import APIRouter, HTTPException
from beanie import PydanticObjectId
from app.models.ev_station import EVStation

router = APIRouter()

@router.get("/")
async def get_stations():
    stations = await EVStation.find(
        EVStation.is_active == True
    ).to_list()
    return [
        {
            "id": str(s.id),
            "name": s.name,
            "city": s.city,
            "address": s.address,
            "lat": s.lat,
            "lng": s.lng,
            "charger_type": s.charger_type,
            "power_kw": s.power_kw,
            "status": s.status,
            "working_hours": s.working_hours,
        }
        for s in stations
    ]

@router.get("/{station_id}")
async def get_station(station_id: str):
    try:
        station = await EVStation.get(PydanticObjectId(station_id))
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid station id")
    if not station:
        raise HTTPException(status_code=404, detail="Station not found")
    return station
