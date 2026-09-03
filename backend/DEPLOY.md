# VPS Deployment Guide

## 1. SSH into VPS
ssh root@your-vps-ip

## 2. Install dependencies
apt update && apt install -y python3.11 python3.11-venv nginx

## 3. Clone repo
git clone https://github.com/niharsasini/soumyasi-pvt-ltd.git
cd soumyasi-pvt-ltd/backend

## 4. Setup Python environment
python3.11 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

## 5. Create .env file
cp .env.example .env
nano .env  # Fill in all values

## 6. Create admin user
python scripts/create_admin.py

## 7. Seed EV stations
python scripts/seed_data.py

## 8. Setup systemd service
cp soumyashi-backend.service /etc/systemd/system/
systemctl daemon-reload
systemctl enable soumyashi-backend
systemctl start soumyashi-backend

## 9. Setup Nginx
cp nginx.conf /etc/nginx/sites-available/soumyashi-backend
ln -s /etc/nginx/sites-available/soumyashi-backend /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

## 10. SSL Certificate (free)
apt install certbot python3-certbot-nginx
certbot --nginx -d api.soumyashipower.in

## 11. Verify
curl https://api.soumyashipower.in/health
# Should return: {"status": "healthy"}

## 12. DNS in Hostinger
Add A record:
Name: api
Value: your-vps-ip
TTL: 3600
