from beanie import Document
from pydantic import EmailStr, Field
from typing import Optional
from datetime import datetime

class NewsletterSubscriber(Document):
    email: EmailStr
    is_active: bool = True
    subscribed_at: datetime = Field(default_factory=datetime.utcnow)
    unsubscribed_at: Optional[datetime] = None

    class Settings:
        name = "newsletter_subscribers"
        indexes = ["email"]
