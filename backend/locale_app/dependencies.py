from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from locale_app.database import SessionLocal
from .auth import SECRET_KEY, ALGORITHM
from locale_app import models  


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_token(db: Session = Depends(SessionLocal), token: str = Depends(oauth2_scheme)):
    try:
        credentials_exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            user_id: int = payload.get("sub")
            if user_id is None:
                raise credentials_exception
        except JWTError:
            raise credentials_exception

        return token
    except Exception as e:
        print(f"JWTError: {e}")
        raise

    
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_jwt_token(user_id: int, user_email: str):
    payload = {"sub": user_id, "email": user_email}
    secret_key = "your_secret_key"
    token = jwt.encode(payload, secret_key, algorithm="HS256")
    return token

def get_user_from_session(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError as e:
        print(f"JWTError: {e}")
        raise credentials_exception

    user = db.query(models.User).filter(models.User.user_id == user_id).first()
    if user is None:
        raise credentials_exception
    return user.user_id

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        if token is None:
            raise credentials_exception
        
        token_parts = token.split(" ")
        if len(token_parts) != 2 or token_parts[0].lower() != "bearer":
            raise credentials_exception
        
        token = token_parts[1]
        
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError as e:
        print(f"Current User Error: {e}")
        raise credentials_exception

    db_user = db.query(models.User).filter(models.User.user_email == email).first()
    if db_user is None:
        raise credentials_exception

    return db_user