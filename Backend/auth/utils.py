# immonkei/job-recommendation/Job-Recommendation-main/Backend/auth/utils.py
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
import os

# Use environment variables for secrets
SECRET_KEY = os.getenv(
    "SECRET_KEY",
    "a3f4d8e1b5c7f9d2e4a6c8b0d1e3f5a7b9d2e4f6a8b0c2d4e6f8a1b3c5d7e9"
)
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60"))

# --- TEMPORARY DEBUG PRINT ---
print(f"DEBUG: SECRET_KEY being used: {SECRET_KEY}")
print(f"DEBUG: ACCESS_TOKEN_EXPIRE_MINUTES being used: {ACCESS_TOKEN_EXPIRE_MINUTES}")
# --- END TEMPORARY DEBUG PRINT ---

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a plain password against its hash."""
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """Generate password hash."""
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta = None) -> str:
    """Create JWT access token."""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt