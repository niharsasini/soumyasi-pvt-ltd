from fastapi import APIRouter, Request, BackgroundTasks
from app.models.contact import ContactSubmission
from app.schemas.contact import ContactCreate, ContactResponse
from app.services.email_service import notify_contact

router = APIRouter()

@router.post("/", response_model=ContactResponse)
async def submit_contact(
    data: ContactCreate,
    background_tasks: BackgroundTasks,
    request: Request
):
    submission = ContactSubmission(
        **data.model_dump(),
        ip_address=request.client.host if request.client else None,
    )
    await submission.insert()
    background_tasks.add_task(notify_contact, submission)
    return ContactResponse(
        success=True,
        message="Thank you! We will contact you within 24 hours.",
        id=str(submission.id)
    )

@router.get("/")
async def get_contacts(skip: int = 0, limit: int = 50):
    contacts = await ContactSubmission.find_all().skip(skip).limit(limit).to_list()
    return contacts
