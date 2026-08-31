def test_get_all_stations_empty(client):
    response = client.get("/api/v1/ev-stations/")
    assert response.status_code == 200
    assert response.json() == []


def test_get_station_not_found(client):
    response = client.get("/api/v1/ev-stations/999")
    assert response.status_code == 200
    assert response.json() is None
