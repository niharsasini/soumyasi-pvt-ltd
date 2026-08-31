def test_submit_contact(client):
    payload = {
        "name": "Test User",
        "email": "test@example.com",
        "phone": "9437611129",
        "service": "Solar Rooftop",
        "message": "I'd like a free site assessment.",
    }
    response = client.post("/api/v1/contact/", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["id"] is not None


def test_submit_contact_missing_required_field(client):
    payload = {"name": "Test User", "email": "test@example.com"}
    response = client.post("/api/v1/contact/", json=payload)
    assert response.status_code == 422
