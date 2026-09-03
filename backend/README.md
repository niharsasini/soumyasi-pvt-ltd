# Soumyashi Power — Backend API

FastAPI + MongoDB backend for soumyashipower.in

## Tech Stack
- **Framework**: FastAPI (Python 3.11+)
- **Database**: MongoDB
- **Driver / ODM**: Motor (async) + Beanie
- **Auth**: JWT (python-jose)
- **Email**: Gmail SMTP via aiosmtplib
- **File uploads**: Cloudinary

## Quick Start

### 1. Setup environment
cp .env.example .env
# Fill in your values in .env

### 2. Install dependencies
pip install -r requirements.txt

### 3. Run with Docker (recommended for local dev)
docker-compose up -d

### 4. Run locally
uvicorn app.main:app --reload --port 8000

### 5. Create an admin user
python scripts/create_admin.py

### 6. Seed EV stations
python scripts/seed_data.py

### 7. API Documentation
http://localhost:8000/api/docs

## API Endpoints

### Public
- POST /api/v1/contact — Contact form submission
- GET  /api/v1/contact — List contact submissions
- POST /api/v1/newsletter — Newsletter subscription
- POST /api/v1/ev-partner — EV partner enquiry
- GET  /api/v1/ev-partner — List EV partner applications
- GET  /api/v1/ev-stations — All active EV stations (for map)
- GET  /api/v1/ev-stations/{id} — Single EV station
- GET  /api/v1/projects — All published projects
- GET  /api/v1/projects/{slug} — Single project
- GET  /api/v1/blog — All published blog posts
- GET  /api/v1/blog/{slug} — Single blog post
- GET  /api/v1/careers — All active job listings
- GET  /api/v1/careers/{slug} — Single job
- POST /api/v1/careers/{slug}/apply — Job application

### Admin (JWT protected)
- POST /api/v1/admin/login — Admin login
- GET  /api/v1/admin/me — Current admin profile
- GET  /api/v1/admin/dashboard — Summary stats
- GET  /api/v1/admin/contacts — All contact submissions
- PATCH /api/v1/admin/contacts/{id} — Update contact status
- GET  /api/v1/admin/ev-partners — All EV partner enquiries
- PATCH /api/v1/admin/ev-partners/{id} — Update EV partner status/notes
- GET  /api/v1/admin/ev-stations — All EV stations (incl. inactive)
- POST /api/v1/admin/ev-stations — Create EV station
- PATCH /api/v1/admin/ev-stations/{id} — Update EV station
- DELETE /api/v1/admin/ev-stations/{id} — Deactivate EV station
- POST /api/v1/admin/create-admin — Create another admin (superadmin only)

## Database Schema
See `app/models/` for all Beanie document models.

## Deployment
See `DEPLOY.md` for the VPS (systemd + Nginx) deployment guide.

## Environment Variables
See `.env.example` for all required variables.
