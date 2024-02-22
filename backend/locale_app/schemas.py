from datetime import datetime
from pydantic import BaseModel
from typing import Optional, List


class Token(BaseModel):
    access_token: str
    token_type: str

class UserRequest(BaseModel):
    fname: str
    lname: str
    email: str
    pwd: str

class UserResponse(BaseModel):
    id: int
    fname: str
    lname: str
    email: str
    hashed_pwd: str