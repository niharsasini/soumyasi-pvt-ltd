from fastapi import APIRouter
from app.models.ev_station import EVStation, StationStatus
from app.models.project import Project
from app.models.ev_partner import EVPartnerApplication

router = APIRouter()

@router.get("/")
async def get_public_stats():
    active_stations = await EVStation.find(
        EVStation.is_active == True,
        EVStation.status == StationStatus.ACTIVE
    ).count()

    all_stations = await EVStation.find(
        EVStation.is_active == True
    ).to_list()

    cities = len({s.city for s in all_stations})

    completed_projects = await Project.find(
        Project.is_published == True
    ).count()
    partner_enquiries = await EVPartnerApplication.count()

    return {
        "active_ev_stations": active_stations,
        "total_ev_stations": len(all_stations),
        "cities_covered": cities,
        "completed_projects": completed_projects,
        "partner_enquiries": partner_enquiries,
    }
