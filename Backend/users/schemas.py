from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    email: EmailStr
    is_active: bool

    class Config:
             from_attributes = True