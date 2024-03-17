import bcrypt, hashlib, logging
from datetime import datetime
from fastapi import APIRouter, Request, status, Depends, HTTPException, Path
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session, joinedload
from locale_app import starter, models, schemas
from passlib.context import CryptContext
from typing import Optional, List
from locale_app.models import Users, Region, State, LGA, City
from locale_app.schemas import RegionDetail, StateDetail, UserResponse, RegistrationRequest, LoginRequest
from locale_app.database import SessionLocal
from .auth import create_access_token, verify_token, authenticate_user
from locale_app.dependencies import get_db, get_user_from_session, get_current_user, create_jwt_token, get_token
from .dependencies import get_db
from .utils import generate_api_key



locale_router = APIRouter()
logger = logging.getLogger(__name__)


def hash_password(pwd: str) -> str:
    salt = bcrypt.gensalt()
    hashed_pwd = bcrypt.hashpw(pwd.encode('utf-8'), salt)
    return hashed_pwd.decode('utf-8')


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)




#    E  N  D  P  O  I  N  T  S

@starter.get("/")
async def get_index():
    try:
        return {"message": "Locale API!"}

    except Exception as e:
        logger.error(f"Error: {e}")
        raise

@starter.get("/users", response_model=list[schemas.UserResponse])
async def get_users(db: Session = Depends(get_db)):
    try:
        users = db.query(models.Users).all()
        if not users:
            raise HTTPException(status_code=404, detail="Users not available!")

        user_responses = [
            schemas.UserResponse(
                id=user.id,
                fname=user.fname,
                lname=user.lname,
                email=user.email,
            )
            for user in users
        ]
        return user_responses
    except Exception as e:
        logger.error(f"Error: {e}")
        raise


@starter.get("/users/{id}", response_model=schemas.UserResponse)
async def get_user(id: int, db: Session = Depends(get_db)):
    try:
        user = db.query(Users).filter(Users.id == id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not available!")

        user_response = schemas.UserResponse(
            id = user.id,
            fname = user.fname,
            lname = user.lname,
            email = user.email,
            hashedpwd = user.hashedpwd
        )

        return user_response
    except Exception as e:
        logger.error(f"Error: {e}")
        raise

@starter.put("/users/{id}", response_model=schemas.UserResponse)
async def edit_profile(id: int, user_data: schemas.UpdateRequest, db: Session = Depends(get_db)):
    try:
        user = db.query(Users).filter(Users.id == id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not available!")

        if user_data.fname:
            user.fname = user_data.fname
        if user_data.lname:
            user.lname = user_data.lname
        if user_data.email:
            user.email = user_data.email

        db.commit()

        return schemas.UserResponse(
            id=user.id,
            fname=user.fname,
            lname=user.lname,
            email=user.email,
        )
    except Exception as e:
        logger.error(f"Error: {e}")
        raise


@starter.get("/api-key/{api_key}")
async def get_api_key(api_key: str = Path(...), db: Session = Depends(get_db)):
    try:
        print(f"Received API key: {api_key}")
        user = db.query(Users).filter(Users.api_key == api_key).first()
  
        if not user:
            raise HTTPException(status_code=404, detail="Incorrect API key. Sign up to generate API key")

        return {"api_key": user.api_key}

    except Exception as e:
        logger.error(f"Error: {e}")
        raise


@starter.post("/api-key/{api_key}")
async def api(api_key: str = Path(...), db: Session = Depends(get_db)):
    try:
        print(f"Received API key: {api_key}")
        user = db.query(Users).filter(Users.api_key == api_key).first()
  
        if not user:
            raise HTTPException(status_code=404, detail="Invalid API key. Register to generate API key")

        return {"api_key": user.api_key}

    except Exception as e:
        logger.error(f"Error: {e}")
        raise


@starter.get("/regions", response_model=list[schemas.RegionDetail])
async def get_regions(db: Session = Depends(get_db)):
    try:
        regions = db.query(models.Region).all()

        return regions

    except Exception as e:
        logger.error(f"Error: {e}")
        raise


@starter.get("/regions/{region_id}", response_model=RegionDetail)
async def get_region(region_id: int, db: Session = Depends(get_db)):
    try:
        region = db.query(Region).filter(Region.region_id == region_id).first()
        if not region:
            raise HTTPException(status_code=404, detail="Region not found")

        state_names = [state.state_name for state in region.states]
        cities = [city.city_name for city in region.cities]

        return {
            "region_id": region.region_id, 
            "region_name":region.region_name, 
            "state_names": state_names, 
            "cities": cities
            }

    except Exception as e:
        logger.error(f"Error: {e}")
        raise


@starter.get("/regions/region/{regionSearch}", response_model=RegionDetail)
async def get_region_by_name(regionSearch: str, db: Session = Depends(get_db)):
    try:
        name = regionSearch.capitalize()
        print(f"Region Name Received: {name}")
        region = db.query(models.Region).filter(models.Region.region_name == name).first()
        if region:
            return RegionDetail(
                region_id=region.region_id,
                region_name=region.region_name,
                state_names=[state.state_name for state in region.states],
                cities=[city.city_name for city in region.cities]
            )

        else:
            raise HTTPException(status_code=404, detail="The region does not exist.")

    except Exception as e:
        print(f"Error: {e}")
        raise



@starter.get("/states", response_model=list[schemas.StateDetail])
async def get_states(db: Session = Depends(get_db)):
    try:
        states = db.query(models.State).all()

        return states

    except Exception as e:
        logger.error(f"Error: {e}")
        raise


@starter.get("/states/{state_id}", response_model=StateDetail)
async def get_state(state_id: int, db: Session = Depends(get_db)):
    try:
        state = (
            db.query(models.State)
            .join(models.Region)
            .join(models.LGA)
            .filter(models.State.state_id == state_id)
            .first()
        )
        if not state:
            raise HTTPException(status_code=404, detail="State not found")
        
        return StateDetail(
            state_id=state.state_id,
            state_name=state.state_name,
            region_name=state.region.region_name,
            lgas=[lga.lga_name for lga in state.lgas],
            cities=[city.city_name for city in state.cities]
        )
    except Exception as e:
        logger.error(f"Error: {e}")
        raise


@starter.get("/states/state/{stateSearch}", response_model=StateDetail)
async def get_state_by_name(stateSearch: str, db: Session = Depends(get_db)):
    try:
        name = stateSearch.capitalize()
        print(f"State Name Received: {name}")
        state = db.query(models.State).filter(models.State.state_name == name).first()

        if state:
            return StateDetail(
                state_id=state.state_id,
                state_name=state.state_name,
                region_name=state.region.region_name,
                lgas=[lga.lga_name for lga in state.lgas],
                cities=[city.city_name for city in state.cities]
            )

        else:
            raise HTTPException(status_code=404, detail="The state does not exist.")

    except Exception as e:
        logger.error(f"Error: {e}")
        raise



@starter.get("/lgas")
async def get_lgas(db: Session = Depends(get_db)):
    try:
        lgas = db.query(models.LGA).all()

        return lgas

    except Exception as e:
        logger.error(f"Error: {e}")
        raise


@starter.get("/lgas/{lga_id}")
async def get_lga(lga_id: int, db: Session = Depends(get_db), user: Users = Depends(get_current_user)):
    try:
        lga = db.query(LGA).filter(LGA.lga_id == lga_id).first()
        if not lga:
            raise HTTPException(status_code=404, detail="LGA not found")
        return lga
    except Exception as e:
        logger.error(f"Error: {e}")
        raise


@starter.get("/cities")
async def get_cities(db: Session = Depends(get_db)):
    try:
        cities = (
            db.query(City)
            .options(joinedload(City.state)) 
            .all()
        )

        cities_data = []
        for city in cities:
            city_data = {
                "city_id": city.city_id,
                "city_name": city.city_name,
                "city_state_name": city.state.state_name, 
                "city_population": city.city_population,
                "city_area": city.city_area,
                "city_density": city.city_density
            }
            cities_data.append(city_data)

        return cities_data

    except Exception as e:
        logger.error(f"Error: {e}")
        raise


@starter.get("/cities/{city_id}")
async def get_city(city_id: int, db: Session = Depends(get_db)):
    try:
        city = db.query(City).get(city_id)
        if not city:
            raise HTTPException(status_code=404, detail="City not found")

        city_data = {
            "city_id": city.city_id,
            "city_name": city.city_name,
            "city_state_name": city.state.state_name, 
            "city_population": city.city_population,
            "city_area": city.city_area,
            "city_density": city.city_density
        }

        return city_data

    except Exception as e:
        logger.error(f"Error: {e}")
        raise


@starter.post("/register")
async def register_user(user_request: RegistrationRequest, db: Session = Depends(get_db)):
    try:
        if user_request.pwd != user_request.cpwd:
            raise HTTPException(status_code=400, detail="Passwords must match!")

        if not all([user_request.fname, user_request.lname, user_request.email, user_request.pwd, user_request.cpwd]):
            raise HTTPException(status_code=400, detail="All fields are required")

        existing_user = db.query(Users).filter(Users.email == user_request.email).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="Email is not available. Use another email address")

        hashedpwd = hash_password(user_request.pwd)

        new_user = Users(
            fname=user_request.fname,
            lname=user_request.lname,
            email=user_request.email,
            hashedpwd=hashedpwd,
            api_key=generate_api_key()
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        token = create_access_token({"sub": new_user.email})

        return {
            "fname": new_user.fname,
            "lname": new_user.lname,
            "email": new_user.email,
            "token": token
        }

    except Exception as e:
        logger.error(f"Error: {e}")
        db.rollback()
        raise


@starter.post("/login")
async def login_user(user_request: LoginRequest, db: Session = Depends(get_db)):
    try:
        if not all([user_request.email, user_request.pwd]):
            raise HTTPException(status_code=400, detail="All fields are required!")

        user = db.query(Users).filter(Users.email == user_request.email).first()
        if not user or not verify_password(user_request.pwd, user.hashedpwd):
            raise HTTPException(status_code=401, detail="Incorrect username or password")

        access_token = create_access_token(data={"sub": user.email})
        print(f"Access Token: {access_token}")

        return JSONResponse(content={
            "access_token": access_token, "token_type": "bearer",
            "user": {
                "id": user.id,
                "fname": user.fname,
                "lname": user.lname,
                "email": user.email,
                "api_key": user.api_key
            }
        })
            
    except Exception as e:
        logger.error(f"Error: {e}")
        raise


@starter.post("/logout")
async def logout_user(token: str = Depends(get_token)):
    try:
        user_id = get_user_from_session(token)
        if user_id:
            remove_user_from_session(user_id)
            return {"message": "Logout successful"}
        else:
            raise HTTPException(status_code=401, detail="User not in session")
    except Exception as e:
        logger.error(f"Error: {e}")
        raise