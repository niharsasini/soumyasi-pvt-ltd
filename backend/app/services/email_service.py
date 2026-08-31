import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.config import settings

def send_email(
    to_email: str,
    subject: str,
    html_content: str,
    text_content: str = ""
):
    """Send email via SMTP"""
    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = f"{settings.EMAIL_FROM_NAME} <{settings.EMAIL_FROM}>"
    msg["To"] = to_email

    if text_content:
        msg.attach(MIMEText(text_content, "plain"))
    msg.attach(MIMEText(html_content, "html"))

    try:
        with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
            server.starttls()
            server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
            server.sendmail(settings.EMAIL_FROM, to_email, msg.as_string())
        return True
    except Exception as e:
        print(f"Email error: {e}")
        return False

def notify_admin_contact(submission):
    """Notify admin of new contact submission"""
    subject = f"New Contact Form: {submission.name}"
    html = f"""
    <h2>New Contact Enquiry</h2>
    <p><strong>Name:</strong> {submission.name}</p>
    <p><strong>Email:</strong> {submission.email}</p>
    <p><strong>Phone:</strong> {submission.phone or 'Not provided'}</p>
    <p><strong>Service:</strong> {submission.service or 'Not specified'}</p>
    <p><strong>Message:</strong></p>
    <p>{submission.message}</p>
    """
    send_email(settings.ADMIN_EMAIL, subject, html)

def notify_admin_ev_partner(enquiry):
    """Notify admin of new EV partner enquiry"""
    subject = f"New EV Partner Enquiry: {enquiry.name} — {enquiry.city}"
    html = f"""
    <h2>New EV Partner Enquiry</h2>
    <p><strong>Name:</strong> {enquiry.name}</p>
    <p><strong>Phone:</strong> {enquiry.phone}</p>
    <p><strong>Location Type:</strong> {enquiry.location_type}</p>
    <p><strong>City:</strong> {enquiry.city}</p>
    <p><strong>Message:</strong> {enquiry.message or 'None'}</p>
    """
    send_email(settings.ADMIN_EMAIL, subject, html)
