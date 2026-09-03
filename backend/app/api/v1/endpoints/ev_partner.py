from fastapi import APIRouter, Request, BackgroundTasks
from app.models.ev_partner import EVPartnerApplication
from app.schemas.ev_partner import EVPartnerCreate, EVPartnerResponse
from app.services.email_service import notify_ev_partner

router = APIRouter()

@router.post("/", response_model=EVPartnerResponse)
async def submit_ev_partner(
    data: EVPartnerCreate,
    background_tasks: BackgroundTasks,
    request: Request
):
    application = EVPartnerApplication(
        **data.model_dump(),
        ip_address=request.client.host if request.client else None,
    )
    await application.insert()
    background_tasks.add_task(notify_ev_partner, application)
    return EVPartnerResponse(
        success=True,
        message="Application received! We'll contact you within 48 hours.",
        id=str(application.id)
    )

@router.get("/")
async def get_applications(skip: int = 0, limit: int = 50):
    apps = await EVPartnerApplication.find_all().skip(skip).limit(limit).to_list()
    return apps
