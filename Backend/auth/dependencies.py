from datetime import datetime, timedelta
from typing import Annotated
import logging

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from auth.database import SessionLocal, engine
from users.models import User
from auth.utils import SECRET_KEY, ALGORITHM, verify_password , ACCESS_TOKEN_EXPIRE_MINUTES # Ensure SECRET_KEY and ALGORITHM are imported
from .models import TokenData

# Configure logging for this module
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG) # Set to DEBUG to see all messages
handler = logging.StreamHandler()
formatter = logging.Formatter('%(levelname)s: %(name)s: %(message)s')
handler.setFormatter(formatter)
# Ensure handler is added only once, especially important with --reload
if not logger.handlers:
    logger.addHandler(handler)


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# MODIFIED: get_user now queries by email first, then by username
def get_user(db: Session, identifier: str): # Renamed 'username' to 'identifier' for clarity
    logger.debug(f"Attempting to get user from DB using identifier (email/username): {identifier}")
    
    # Try to find user by email
    user = db.query(User).filter(User.email == identifier).first()
    
    # If not found by email, try to find by username
    if not user:
        user = db.query(User).filter(User.username == identifier).first()

    if user:
        logger.debug(f"User found in DB: {user.username} (email: {user.email})")
    else:
        logger.debug(f"User NOT found in DB for identifier: {identifier}")
    return user

def authenticate_user(db: Session, username: str, password: str):
    # 'username' here is the identifier sent from the frontend (which could be email or actual username)
    user = get_user(db, username) # Pass the identifier to get_user
    if not user:
        logger.warning(f"Authentication failed: User '{username}' not found.")
        return False
    if not verify_password(password, user.hashed_password):
        logger.warning(f"Authentication failed: Incorrect password for user '{username}'.")
        return False
    logger.info(f"User '{user.username}' authenticated successfully.")
    return user

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        # ACCESS_TOKEN_EXPIRE_MINUTES is imported from auth.utils
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    logger.info(f"JWT created for sub: {data.get('sub')}, expires: {expire}")
    return encoded_jwt

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)], db: Session = Depends(get_db)):
    logger.debug(f"Received token for validation: {token[:60]}...") # Log first 60 chars
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        # Log the key and algorithm being used for decoding
        logger.debug(f"Attempting to decode token with SECRET_KEY (first 10 chars): {SECRET_KEY[:10]}... and ALGORITHM: {ALGORITHM}")
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        logger.debug(f"Token decoded successfully. Payload: {payload}")
        
        username: str = payload.get("sub")
        if username is None:
            logger.error("Token payload missing 'sub' claim.")
            raise credentials_exception
        
        # Log the username extracted from the token
        logger.debug(f"Username extracted from token: {username}")
        token_data = TokenData(username=username)
    except JWTError as e:
        # Log the specific JWT error
        logger.error(f"JWT decoding error: {e}")
        raise credentials_exception
    
    # Log the attempt to find the user in the database
    logger.debug(f"Attempting to find user '{token_data.username}' in database.")
    user = get_user(db, identifier=token_data.username) # Pass the identifier to get_user
    if user is None:
        logger.error(f"User '{token_data.username}' from token not found in database.")
        raise credentials_exception
    
    logger.info(f"Current user '{user.username}' successfully retrieved from token and is active: {user.is_active}.")
    # You might want to add a check for user.is_active here if inactive users shouldn't access protected routes
    if not user.is_active:
        logger.warning(f"User '{user.username}' is inactive but attempted to access protected route.")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Inactive user")

    return user
