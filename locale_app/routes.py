import os, time, bcrypt, hashlib, logging, requests
from datetime import datetime
from fastapi import APIRouter, Request, status, Depends, HTTPException, Form
from fastapi.responses import JSONResponse
from sqlalchemy import or_
from sqlalchemy.orm import Session
from locale_app import starter, models, schemas
from typing import Optional, List
from locale_app.models import User, Region, State, LGA
from locale_app.schemas import UserResponse, Token, UserRequest
from locale_app.database import SessionLocal
from .authorize import create_access_token, verify_token, authenticate_user
from locale_app.dependencies import get_db, get_user_from_session, get_current_user, create_jwt_token, get_token
from .dependencies import get_db
from instance.config import SECRET_KEY, DATABASE_URI
from dotenv import load_dotenv
from .utils import generate_api_key


load_dotenv()


locale_router = APIRouter()

GOOGLE_MAPS_API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")

logger = logging.getLogger(__name__)



def fetch_data_from_google_maps_api():
    url = "https://maps.googleapis.com/maps/api/geocode/json"
    params = {
        "address": "Nigeria",
        "key": GOOGLE_MAPS_API_KEY
    }
    response = requests.get(url, params=params)
    response.raise_for_status()
    return response.json().get("results", [])


def process_and_store_data():
    data = fetch_data_from_google_maps_api()
    session = SessionLocal()

    for result in data:
        region_name = ...
        state_names = ...
        lga_names = ...

        region = Region(name=region_name)
        session.add(region)
        session.commit()

    session.close()


def refresh_data_periodically():
    while True:
        try:
            process_and_store_data()
            print(f"Data refreshed at {datetime.now()}")
        except Exception as e:
            print(f"Error refreshing data: {e}")

        time.sleep(604800)

refresh_data_periodically()




#    E  N  D  P  O  I  N  T  S

@starter.get("/")
async def get_index():
    """Get the index message."""
    return {"message": "Locale API!"}

@starter.get("/users", response_model=List[schemas.UserResponse])
async def get_users(db: Session = Depends(get_db)):
    """
    Get all users.

    Returns:
    - regions (dict): Dictionary containing regions or a single region.
    """
    users = db.query(User).all()

    if not users:
        raise HTTPException(status_code=404, detail="Users not available!")

    user_responses = [
        UserResponse(
            id = user.id,
            fname = user.fname,
            lname = user.lname,
            email = user.email,
            hashed_pwd = user.hashed_pwd,
        )
        for user in users
    ]

    return user_responses


@starter.get("/users/{id}", response_model=schemas.UserResponse)
async def get_user(id: int, db: Session = Depends(get_db)):
    """
    Get a specific user by ID.

    Parameters:
    - user_id (int, optional): ID of the user to retrieve.

    Returns:
    - A single user.
    """
    user = db.query(User).filter(User.id == id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not available!")

    user_response = schemas.UserResponse(
        id = user.id,
        fname = user.fname,
        lname = user.lname,
        email = user.email,
        hashed_pwd = user.hashed_pwd
    )

    return user_response


@starter.get("/api-key")
async def get_api_key(user: models.User = Depends(get_current_user)):
    """
    Get the API key for the currently logged-in user.
    """
    if user.api_key:
        return {"api_key": user.api_key}
    else:
        raise HTTPException(status_code=404, detail="API key not found")


@locale_router.get("/regions")
async def get_regions(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    """
    Get all regions.

    Returns:
    - All regions.
    """
    regions = db.query(Region).all()
    return regions


@locale_router.get("/regions/{region_id}")
async def get_region(region_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    """
    Get a specific region by ID.

    Parameters:
    - region_id (int): ID of the region to retrieve.

    Returns:
    - region (dict): Dictionary containing the region.
    """
    region = db.query(Region).filter(Region.id == region_id).first()
    if not region:
        raise HTTPException(status_code=404, detail="Region not found")
    return region

@locale_router.get("/states")
async def get_states(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    """
    Get all states.

    Returns:
    - All states.
    """
    states = db.query(State).all()
    return states


@locale_router.get("/states/{state_id}")
async def get_state(state_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    """
    Get a specific state by ID.

    Parameters:
    - state_id (int): ID of the state to retrieve.

    Returns:
    - state (dict): Dictionary containing the state.
    """
    state = db.query(State).filter(State.id == state_id).first()
    if not state:
        raise HTTPException(status_code=404, detail="State not found")
    return state

@locale_router.get("/lgas")
async def get_lgas(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    """
    Get all LGAs.

    Returns:
    - All LGAs.
    """
    lgas = db.query(LGA).all()
    return lgas


@locale_router.get("/lgas/{lga_id}")
async def get_lga(lga_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    """
    Get a specific LGA by ID.

    Parameters:
    - lga_id (int): ID of the LGA to retrieve.

    Returns:
    - lga (dict): Dictionary containing the LGA.
    """
    lga = db.query(LGA).filter(LGA.id == lga_id).first()
    if not lga:
        raise HTTPException(status_code=404, detail="LGA not found")
    return lga


@starter.post("/register")
async def register_user(
    first_name: str = Form(...),
    last_name: str = Form(...),
    email: str = Form(...),
    pwd: str = Form(...),
    c_pwd: str = Form(...),
    db: Session = Depends(get_db)
):
    if pwd != c_pwd:
        raise HTTPException(status_code=400, detail="Passwords do not match")

    existing_user = db.query(models.User).filter(models.User.email == email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email is already taken")

    api_key = generate_api_key()

    hashed_pwd = bcrypt.hashpw(pwd.encode('utf-8'), bcrypt.gensalt())

    new_user = models.User(
        fname = first_name,
        lname = last_name,
        email = email,
        hashed_pwd = hashed_pwd,
        api_key = api_key
    )

    try:
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return {
            "user_fname": new_user.fname,
            "user_lname": new_user.lname,
            "user_email": new_user.email,
            "api_key": new_user.api_key
        }

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")


@starter.post("/login")
async def login_user(
    email: str = Form("mail"),
    pwd: str = Form("pwd"),
    db: Session = Depends(get_db)
    ):
    print(f"Received email: {email}, password: {pwd}")

    if not all([email, pwd]):
        raise HTTPException(status_code=400, detail="All fields are required")

    user = db.query(models.User).filter(models.User.email == email).first()
    if not user or not verify_password(pwd, user.hashed_pwd):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token(data={"sub": user.email})
    print(f"Generated access_token: {access_token}")

    return JSONResponse(content={"access_token": access_token, "token_type": "bearer"})


@starter.post("/logout")
async def logout_user(token: str = Depends(get_token)):
    user_id = get_user_from_session(token)
    if user_id:
        remove_user_from_session(user_id)
        return {"message": "Logout successful"}
    else:
        raise HTTPException(status_code=401, detail="User not in session")