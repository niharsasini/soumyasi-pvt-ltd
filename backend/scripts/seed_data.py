"""
Seed EV station data into MongoDB.
Run: python scripts/seed_data.py
"""
import asyncio
import sys
sys.path.insert(0, '.')

EV_STATIONS = [
    {"name": "Soumyashi Charging Point — Patia",
     "city": "Bhubaneswar", "address": "Patia Square, Bhubaneswar",
     "lat": 20.3536, "lng": 85.8209, "power_kw": 60, "status": "Active"},
    {"name": "Soumyashi Charging Point — Saheed Nagar",
     "city": "Bhubaneswar", "address": "Saheed Nagar, Bhubaneswar",
     "lat": 20.2961, "lng": 85.8245, "power_kw": 60, "status": "Active"},
    {"name": "Soumyashi Charging Point — Chandrasekharpur",
     "city": "Bhubaneswar", "address": "Chandrasekharpur, Bhubaneswar",
     "lat": 20.3230, "lng": 85.8189, "power_kw": 60, "status": "Active"},
    {"name": "Soumyashi Charging Point — Cuttack Station",
     "city": "Cuttack", "address": "Near Railway Station, Cuttack",
     "lat": 20.4625, "lng": 85.8828, "power_kw": 60, "status": "Active"},
    {"name": "Soumyashi Charging Point — Puri Temple Road",
     "city": "Puri", "address": "Grand Road, Puri",
     "lat": 19.8135, "lng": 85.8312, "power_kw": 60, "status": "Active"},
    {"name": "Soumyashi Charging Point — Rourkela",
     "city": "Rourkela", "address": "Udit Nagar, Rourkela",
     "lat": 22.2604, "lng": 84.8536, "power_kw": 60, "status": "Active"},
    {"name": "Soumyashi Charging Point — Sambalpur",
     "city": "Sambalpur", "address": "Ainthapali, Sambalpur",
     "lat": 21.4669, "lng": 83.9812, "power_kw": 60, "status": "Coming Soon"},
    {"name": "Soumyashi Charging Point — Berhampur",
     "city": "Berhampur", "address": "Bada Bazar, Berhampur",
     "lat": 19.3149, "lng": 84.7941, "power_kw": 60, "status": "Coming Soon"},
]

async def seed():
    from app.database import connect_db
    from app.models.ev_station import EVStation

    await connect_db()
    count = 0
    for data in EV_STATIONS:
        existing = await EVStation.find_one(
            EVStation.name == data["name"]
        )
        if not existing:
            station = EVStation(
                **data,
                charger_type="Fast",
                connectors=2,
                working_hours="24/7",
                is_active=True,
            )
            await station.insert()
            count += 1
    print(f"✅ Seeded {count} EV stations")

if __name__ == "__main__":
    asyncio.run(seed())
