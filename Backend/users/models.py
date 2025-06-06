# Backend/users/models.py
from sqlalchemy import Boolean, Column, Integer, String, DateTime # Import DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func # Import func for default timestamp

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now()) # Add this line
    updated_at = Column(DateTime(timezone=True), onupdate=func.now()) # Optional: for update time
    # Add new fields for social logins
    google_id = Column(String, unique=True, nullable=True, index=True)
    github_id = Column(String, unique=True, nullable=True, index=True)