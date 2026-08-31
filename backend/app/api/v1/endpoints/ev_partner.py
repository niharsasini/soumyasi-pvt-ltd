from fastapi import APIRouter, Depends, BackgroundTasks
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.ev_partner import EVPartnerCreate, EVPartnerResponse
from app.models.ev_partner import EVPartnerEnquiry

router = APIRouter()

@router.post("/", response_model=EVPartnerResponse)
async def submit_ev_partner(
    data: EVPartnerCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """Submit EV partner enquiry"""
    enquiry = EVPartnerEnquiry(**data.model_dump())
    db.add(enquiry)
    db.commit()
    db.refresh(enquiry)

    return EVPartnerResponse(
        success=True,
        message="We'll contact you within 48 hours for a free site assessment.",
        id=enquiry.id
    )
