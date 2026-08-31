# Soumyashi Power — Full Stack Website

## Project Structure

```
soumayashree/
├── frontend/          # Next.js website (soumyashipower.in)
├── backend/           # FastAPI Python API
└── README.md
```

## Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

→ http://localhost:3000

## Backend (FastAPI + Python)

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

→ http://localhost:8000/api/docs

## Deployment

- Frontend: Vercel (auto-deploys from main branch)
- Backend: Railway/Render (coming soon)
