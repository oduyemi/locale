from datetime import datetime
from pydantic import BaseModel
from typing import Optional, List



class RegionDetail(BaseModel):
    region_id: int
    region_name: str
    state_names: List[str]
    cities: List[str]

class StateDetail(BaseModel):
    state_id: int
    state_name: str
    region_name: str
    lgas: List[str]
    cities: List[str]

class Token(BaseModel):
    access_token: str
    token_type: str

class UserResponse(BaseModel):
    id: int
    fname: str
    lname: str
    email: str

class RegistrationRequest(BaseModel):
    fname: str
    lname: str
    email: str
    pwd: str
    cpwd: str

class LoginRequest(BaseModel):
    email: str
    pwd: str

class UpdateRequest(BaseModel):
    fname: Optional[str] = None
    lname: Optional[str] = None
    email: Optional[str] = None

class ApiKeyRequest(BaseModel):
    api_key: str