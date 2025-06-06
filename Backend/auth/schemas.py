# Backend/auth/schemas.py
from pydantic import BaseModel, EmailStr
from datetime import datetime # Import datetime

# Base model for shared fields
class UserBase(BaseModel):
    username: str
    email: EmailStr

# Model for creating a new user (input from client)
class UserCreate(UserBase):
    username: str
    password: str
    email: EmailStr

    class Config:
        from_attributes = True

# Model for the response to the client (excludes password)
class UserResponse(UserBase):
    id: int
    email: EmailStr
    is_active: bool
    created_at: datetime # Add this line

    class Config:
        from_attributes = True

# Optional: Model for authentication token response
class Token(BaseModel):
    access_token: str
    token_type: str

    class Config:
        from_attributes = True

# Model for token data within JWT
class TokenData(BaseModel):
    email: str | None = None