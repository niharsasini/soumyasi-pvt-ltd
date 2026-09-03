from fastapi import APIRouter
from app.models.newsletter import NewsletterSubscriber
from app.schemas.newsletter import NewsletterCreate, NewsletterResponse

router = APIRouter()

@router.post("/", response_model=NewsletterResponse)
async def subscribe(data: NewsletterCreate):
    existing = await NewsletterSubscriber.find_one(
        NewsletterSubscriber.email == data.email
    )
    if existing:
        if not existing.is_active:
            existing.is_active = True
            await existing.save()
        return NewsletterResponse(
            success=True,
            message="Subscribed successfully",
            id=str(existing.id)
        )

    subscriber = NewsletterSubscriber(email=data.email)
    await subscriber.insert()
    return NewsletterResponse(
        success=True,
        message="Subscribed successfully",
        id=str(subscriber.id)
    )
