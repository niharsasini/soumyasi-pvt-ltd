import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.config import settings
import logging

logger = logging.getLogger(__name__)

async def send_email(
    to_email: str,
    subject: str,
    html_content: str,
):
    if not settings.GMAIL_USER or not settings.GMAIL_APP_PASSWORD:
        logger.warning("Gmail credentials not configured")
        return False

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = f"{settings.COMPANY_NAME} <{settings.GMAIL_USER}>"
    msg["To"] = to_email
    msg.attach(MIMEText(html_content, "html"))

    try:
        await aiosmtplib.send(
            msg,
            hostname="smtp.gmail.com",
            port=587,
            start_tls=True,
            username=settings.GMAIL_USER,
            password=settings.GMAIL_APP_PASSWORD,
        )
        logger.info(f"Email sent to {to_email}")
        return True
    except Exception as e:
        logger.error(f"Email failed: {e}")
        return False

def get_email_wrapper(title: str, color: str, content: str) -> str:
    return f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;
      margin:0 auto;">
      <div style="background:linear-gradient(135deg,{color});
        padding:30px;border-radius:12px 12px 0 0;">
        <h1 style="color:white;margin:0;font-size:22px;">
          {title}
        </h1>
      </div>
      <div style="background:#fff;padding:30px;
        border:1px solid #e8d5b0;border-top:none;">
        {content}
      </div>
      <div style="background:#1a1208;padding:16px;
        border-radius:0 0 12px 12px;text-align:center;">
        <p style="color:#a8917a;margin:0;font-size:11px;">
          {settings.COMPANY_NAME} ·
          {settings.COMPANY_ADDRESS}
        </p>
      </div>
    </div>
    """

async def notify_contact(submission):
    content = f"""
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:10px 0;border-bottom:1px solid #f0e6d0;
        color:#a8917a;font-size:13px;width:120px;">Name</td>
        <td style="padding:10px 0;border-bottom:1px solid #f0e6d0;
        font-weight:bold;">{submission.name}</td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #f0e6d0;
        color:#a8917a;font-size:13px;">Phone</td>
        <td style="padding:10px 0;border-bottom:1px solid #f0e6d0;">
        <a href="tel:{submission.phone}"
        style="color:#d97706;">{submission.phone or 'N/A'}</a></td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #f0e6d0;
        color:#a8917a;font-size:13px;">Email</td>
        <td style="padding:10px 0;border-bottom:1px solid #f0e6d0;">
        <a href="mailto:{submission.email}"
        style="color:#d97706;">{submission.email}</a></td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #f0e6d0;
        color:#a8917a;font-size:13px;">Service</td>
        <td style="padding:10px 0;border-bottom:1px solid #f0e6d0;">
        {submission.service or 'General'}</td></tr>
      <tr><td style="padding:10px 0;color:#a8917a;font-size:13px;
        vertical-align:top;">Message</td>
        <td style="padding:10px 0;">{submission.message}</td></tr>
    </table>
    <div style="margin-top:20px;padding:14px;background:#fffbf0;
      border-radius:8px;border-left:4px solid #d97706;">
      <p style="margin:0;color:#78614a;font-size:13px;">
        Reply to this email to respond to {submission.name}
      </p>
    </div>
    """
    await send_email(
        settings.ADMIN_EMAIL,
        f"New Enquiry — {submission.name} ({submission.service or 'General'})",
        get_email_wrapper("New Contact Enquiry", "#f59e0b,#d97706", content)
    )
    # Auto-reply
    auto_content = f"""
    <p style="color:#1a1208;">Dear {submission.name},</p>
    <p style="color:#78614a;line-height:1.7;">
      Thank you for contacting Soumyashi Power. We have received
      your enquiry and will respond within <strong
      style="color:#d97706;">24 hours</strong>.
    </p>
    <p style="color:#78614a;">For urgent queries:</p>
    <a href="tel:{settings.ADMIN_PHONE}"
      style="display:inline-block;background:#d97706;color:white;
      padding:10px 24px;border-radius:50px;text-decoration:none;
      font-weight:bold;font-size:14px;margin-right:8px;">
      {settings.ADMIN_PHONE}
    </a>
    <a href="tel:{settings.ADMIN_PHONE2}"
      style="display:inline-block;background:#f59e0b;color:white;
      padding:10px 24px;border-radius:50px;text-decoration:none;
      font-weight:bold;font-size:14px;">
      {settings.ADMIN_PHONE2}
    </a>
    """
    await send_email(
        submission.email,
        "Thank you for contacting Soumyashi Power",
        get_email_wrapper(
            f"Thank you, {submission.name}!",
            "#f59e0b,#d97706",
            auto_content
        )
    )

async def notify_ev_partner(application):
    content = f"""
    <div style="background:#ecfdf5;border:1px solid #a7f3d0;
      border-radius:8px;padding:16px;margin-bottom:20px;">
      <p style="margin:0;color:#065f46;font-weight:bold;">
        ⏰ Call {application.name} within 48 hours
      </p>
      <p style="margin:8px 0 0;color:#059669;font-size:18px;
        font-weight:bold;">
        <a href="tel:{application.phone}"
        style="color:#059669;">{application.phone}</a>
      </p>
    </div>
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:10px 0;border-bottom:1px solid #f0e6d0;
        color:#a8917a;font-size:13px;width:140px;">Name</td>
        <td style="padding:10px 0;border-bottom:1px solid #f0e6d0;
        font-weight:bold;">{application.name}</td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #f0e6d0;
        color:#a8917a;font-size:13px;">Phone</td>
        <td style="padding:10px 0;border-bottom:1px solid #f0e6d0;">
        <a href="tel:{application.phone}"
        style="color:#059669;font-weight:bold;font-size:16px;">
        {application.phone}</a></td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #f0e6d0;
        color:#a8917a;font-size:13px;">Email</td>
        <td style="padding:10px 0;border-bottom:1px solid #f0e6d0;">
        {application.email}</td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #f0e6d0;
        color:#a8917a;font-size:13px;">Location Type</td>
        <td style="padding:10px 0;border-bottom:1px solid #f0e6d0;">
        {application.location_type}</td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #f0e6d0;
        color:#a8917a;font-size:13px;">City</td>
        <td style="padding:10px 0;border-bottom:1px solid #f0e6d0;
        font-weight:bold;">{application.city}</td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #f0e6d0;
        color:#a8917a;font-size:13px;">Address</td>
        <td style="padding:10px 0;border-bottom:1px solid #f0e6d0;">
        {application.address}</td></tr>
      <tr><td style="padding:10px 0;color:#a8917a;font-size:13px;">
        Space</td>
        <td style="padding:10px 0;">
        {application.available_space or 'Not specified'}</td></tr>
    </table>
    """
    await send_email(
        settings.ADMIN_EMAIL,
        f"⚡ New EV Partner — {application.name}, {application.city}",
        get_email_wrapper(
            "New EV Partner Application",
            "#059669,#047857",
            content
        )
    )
    # Auto-reply
    auto = f"""
    <p style="color:#1a1208;">Dear {application.name},</p>
    <p style="color:#78614a;line-height:1.7;">
      Thank you for applying to our EV Charging Partner Programme.
      We have received your application for <strong
      style="color:#059669;">{application.city}</strong>.
      Our team will conduct a <strong>free site assessment
      within 48 hours</strong>.
    </p>
    <div style="background:#ecfdf5;border-radius:8px;
      padding:20px;margin:20px 0;">
      <h3 style="color:#065f46;margin:0 0 12px;">What happens next?</h3>
      <ol style="color:#78614a;padding-left:20px;margin:0;">
        <li style="padding:4px 0;">Our engineer calls you to schedule a site visit</li>
        <li style="padding:4px 0;">Free site assessment at your location</li>
        <li style="padding:4px 0;">Technical design and agreement</li>
        <li style="padding:4px 0;">Installation in 3-5 weeks</li>
        <li style="padding:4px 0;">Go live and start earning!</li>
      </ol>
    </div>
    <a href="tel:{settings.ADMIN_PHONE}"
      style="display:inline-block;background:#059669;color:white;
      padding:10px 24px;border-radius:50px;text-decoration:none;
      font-weight:bold;">
      {settings.ADMIN_PHONE}
    </a>
    """
    await send_email(
        application.email,
        "EV Partner Application Received — Soumyashi Power",
        get_email_wrapper(
            "Application Received! ✓",
            "#059669,#047857",
            auto
        )
    )
