def test_submit_ev_partner_enquiry(client):
    payload = {
        "name": "Partner Test",
        "phone": "7381076808",
        "location_type": "Petrol Pump",
        "city": "Bhubaneswar",
        "message": "Interested in hosting a 60kW charger.",
    }
    response = client.post("/api/v1/ev-partner/", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["id"] is not None


def test_submit_ev_partner_missing_required_field(client):
    payload = {"name": "Partner Test", "phone": "7381076808"}
    response = client.post("/api/v1/ev-partner/", json=payload)
    assert response.status_code == 422
