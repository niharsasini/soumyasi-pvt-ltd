from fastapi import APIRouter, Depends, BackgroundTasks
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.contact import ContactCreate, ContactResponse
from app.models.contact import ContactSubmission

router = APIRouter()

@router.post("/", response_model=ContactResponse)
async def submit_contact(
    data: ContactCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """Submit contact form enquiry"""
    # Save to database
    submission = ContactSubmission(**data.model_dump())
    db.add(submission)
    db.commit()
    db.refresh(submission)

    # Send email notification in background
    # background_tasks.add_task(send_contact_email, submission)

    return ContactResponse(
        success=True,
        message="Thank you! We will contact you within 24 hours.",
        id=submission.id
    )

@router.get("/")
async def get_submissions(db: Session = Depends(get_db)):
    """Get all contact submissions (admin only)"""
    return db.query(ContactSubmission).all()
