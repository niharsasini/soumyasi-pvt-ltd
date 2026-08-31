import httpx
from app.config import settings

# TODO: wire up to Twilio / WATI once WHATSAPP_API_KEY is provisioned

async def send_whatsapp_message(to_phone: str, message: str) -> bool:
    """Send a WhatsApp notification via the configured provider"""
    try:
        # Placeholder request — replace with actual provider API call
        async with httpx.AsyncClient() as client:
            print(f"[whatsapp stub] to={to_phone} message={message}")
        return True
    except Exception as e:
        print(f"WhatsApp send error: {e}")
        return False
