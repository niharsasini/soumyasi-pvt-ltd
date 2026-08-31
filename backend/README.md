# Soumyashi Power — Backend API

FastAPI + PostgreSQL + Redis backend for soumyashipower.in

## Tech Stack
- **Framework**: FastAPI (Python 3.11+)
- **Database**: PostgreSQL 15
- **Cache**: Redis 7
- **ORM**: SQLAlchemy 2.0
- **Migrations**: Alembic
- **Auth**: JWT (python-jose)

## Quick Start

### 1. Setup environment
cp .env.example .env
# Fill in your values in .env

### 2. Install dependencies
pip install -r requirements.txt

### 3. Run with Docker (recommended)
docker-compose up -d

### 4. Run locally
uvicorn app.main:app --reload --port 8000

### 5. API Documentation
http://localhost:8000/api/docs

## API Endpoints

### Public
- POST /api/v1/contact — Contact form submission
- POST /api/v1/newsletter — Newsletter subscription
- POST /api/v1/ev-partner — EV partner enquiry
- GET  /api/v1/ev-stations — All EV stations (for map)
- GET  /api/v1/solutions — All solutions
- GET  /api/v1/projects — All projects
- GET  /api/v1/blog — All blog posts
- GET  /api/v1/careers — All job listings
- POST /api/v1/careers/apply — Job application

### Admin (JWT protected)
- GET  /api/v1/admin/contacts — All contact submissions
- GET  /api/v1/admin/ev-partners — All EV partner enquiries
- PUT  /api/v1/admin/ev-stations — Manage EV stations
- POST /api/v1/admin/blog — Create blog post
- POST /api/v1/admin/projects — Create project

## Database Schema
See models/ folder for all SQLAlchemy models.

## Environment Variables
See .env.example for all required variables.
