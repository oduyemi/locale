import pytest
from fastapi.testclient import TestClient
from unittest.mock import MagicMock, patch
from locale_app import app  
from locale_app.models import Users, Region, State, LGA, City

@pytest.fixture
def client():
    return TestClient(app)

@pytest.fixture
def mock_db_session():
    return MagicMock()

@patch('routes.get_db', return_value=mock_db_session)
def test_get_users(mock_get_db, client, mock_db_session):
    mock_users = [
        Users(id=1, fname="John", lname="Doe", email="john@example.com"),
        Users(id=2, fname="Jane", lname="Doe", email="jane@example.com")
    ]
    mock_db_session.query.return_value.all.return_value = mock_users
    
    response = client.get("/users")
    assert response.status_code == 200
    assert response.json() == [
        {"id": 1, "fname": "John", "lname": "Doe", "email": "john@example.com"},
        {"id": 2, "fname": "Jane", "lname": "Doe", "email": "jane@example.com"}
    ]
    mock_db_session.query.assert_called_once_with(Users)
    mock_db_session.query.return_value.all.assert_called_once()

@patch('routes.get_db', return_value=mock_db_session)
def test_get_regions(mock_get_db, client, mock_db_session):
    mock_regions = [
        Region(region_id=1, region_name="Region A"),
        Region(region_id=2, region_name="Region B")
    ]
    mock_db_session.query.return_value.all.return_value = mock_regions
    
    response = client.get("/regions")
    assert response.status_code == 200
    assert response.json() == [
        {"region_id": 1, "region_name": "Region A"},
        {"region_id": 2, "region_name": "Region B"}
    ]
    mock_db_session.query.assert_called_once_with(Region)
    mock_db_session.query.return_value.all.assert_called_once()


@patch('routes.get_db', return_value=mock_db_session)
def test_get_region(mock_get_db, client, mock_db_session):
    mock_region = Region(region_id=1, region_name="Region A")
    mock_db_session.query.return_value.filter.return_value.first.return_value = mock_region
    
    response = client.get("/regions/1")
    assert response.status_code == 200
    assert response.json() == {
        "region_id": 1,
        "region_name": "Region A"
    }
    mock_db_session.query.assert_called_once_with(Region)
    mock_db_session.query.return_value.filter.assert_called_once_with(Region.region_id == 1)
    mock_db_session.query.return_value.filter.return_value.first.assert_called_once()


if __name__ == "__main__":
    pytest.main()
