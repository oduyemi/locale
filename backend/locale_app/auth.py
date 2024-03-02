from jose import jwt
from datetime import datetime, timedelta
from typing import Annotated
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from starlette import status
from sqlalchemy.orm import Session
from locale_app import SECRET_KEY
from locale_app.models import Users


SECRET_KEY = SECRET_KEY
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def create_access_token(data: dict):
    try:
        to_encode = data.copy()
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        return encoded_jwt
    except jwt.EncodeError as e:
        print(f"Access Token Creation Error: {e}")
        raise


def authenticate_user(db: Session, email: str, password: str):
    try:
        user = db.query(Users).filter(Users.email == email).first()
        if not user or not user.verify_password(password):
            return None
        return user
    except jwt.EncodeError as e:
        print(f"User Authentication Error: {e}")
        raise

def verify_token(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError as e:
        print(f"jwt.ExpiredSignatureError: {e}")
        raise credentials_exception
    except jwt.InvalidTokenError as e:
        print(f"jwt.InvalidTokenError: {e}")
        raise credentials_exception