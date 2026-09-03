#!/bin/bash
cd /var/www/soumyashi-backend
source venv/bin/activate
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 2
