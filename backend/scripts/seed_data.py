"""
Seed initial data into the database.
Run: python scripts/seed_data.py
"""
import sys
sys.path.append(".")

from app.database import SessionLocal
from app.models.ev_station import EVStation

EV_STATIONS = [
    {"name": "Soumyashi Charging Point — Patia", "city": "Bhubaneswar", "address": "Patia, Bhubaneswar", "lat": 20.3536, "lng": 85.8209, "charger_type": "Fast", "power_kw": 60, "status": "Active"},
    {"name": "Soumyashi Charging Point — Saheed Nagar", "city": "Bhubaneswar", "address": "Saheed Nagar, Bhubaneswar", "lat": 20.2961, "lng": 85.8245, "charger_type": "Fast", "power_kw": 60, "status": "Active"},
]

def seed():
    db = SessionLocal()
    try:
        for station_data in EV_STATIONS:
            station = EVStation(**station_data)
            db.add(station)
        db.commit()
        print(f"Seeded {len(EV_STATIONS)} EV stations")
    finally:
        db.close()

if __name__ == "__main__":
    seed()
