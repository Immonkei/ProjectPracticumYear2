# immonkei/job-recommendation/Job-Recommendation-main/Backend/auth/models.py
from pydantic import BaseModel, EmailStr # Keep EmailStr if you use it elsewhere, but not for TokenData

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    # This is the crucial change: TokenData should only expect 'username'
    # as that's what you're putting in the 'sub' claim of your JWTs.
    username: str | None = None # Make it optional to handle cases where it might be missing, though it shouldn't be.

    # Add Pydantic V2 configuration if needed, though from_attributes is usually for ORM models
    class Config:
        from_attributes = True # This is typically for ORM models, but keep if it was there.
