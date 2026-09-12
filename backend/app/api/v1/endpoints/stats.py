from fastapi import APIRouter
from app.models.ev_station import EVStation
from app.models.project import Project
from app.models.ev_partner import EVPartnerApplication

router = APIRouter()

@router.get("/public")
async def get_public_stats():
    active_stations = await EVStation.find(
        EVStation.is_active == True,
        EVStation.status == "Active"
    ).to_list()
    completed_projects = await Project.find(
        Project.is_published == True
    ).count()
    partner_enquiries = await EVPartnerApplication.count()

    return {
        "active_ev_stations": len(active_stations),
        "cities_covered": len({s.city for s in active_stations}),
        "completed_projects": completed_projects,
        "partner_enquiries": partner_enquiries,
    }
