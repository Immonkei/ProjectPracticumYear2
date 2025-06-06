from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
# This import is usually only needed in your main application file (e.g., main.py)
# from fastapi.middleware.cors import CORSMiddleware
# This import is not used in this specific file's logic
# from pydantic import BaseModel
from sqlalchemy.orm import Session
from .dependencies import get_db, authenticate_user, create_access_token, get_user
from .models import Token
from .schemas import UserCreate, UserResponse
# --- IMPORTANT: Corrected import below ---
from users.models import User # Corrected to use absolute import from Backend
# --- End of corrected import ---
from .utils import get_password_hash # Import get_password_hash here

router = APIRouter()


@router.post("/token", response_model=Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/signup", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def signup(user: UserCreate, db: Session = Depends(get_db)):
    if not user.email or user.email.strip() == "":
        raise HTTPException(status_code=400, detail="Email is required")

    # Check if username is already registered
    # FIX: Use 'identifier=' as per get_user signature in dependencies.py
    db_user_by_username = get_user(db, identifier=user.username)
    if db_user_by_username:
        raise HTTPException(status_code=400, detail="Username already registered")

    # Also check if email is already registered for better user experience
    db_user_by_email = get_user(db, identifier=user.email)
    if db_user_by_email:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = get_password_hash(user.password)
    db_user = User(username=user.username, hashed_password=hashed_password, email=user.email, is_active=True)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user