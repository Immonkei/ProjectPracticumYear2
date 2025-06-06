import os
from dotenv import load_dotenv

# --- THIS IS THE CRITICAL LINE: load_dotenv() must be here, at the very top ---
load_dotenv()
# --- End of critical line ---

# --- ADD THESE TWO DEBUG PRINT STATEMENTS ---
print(f"DEBUG: Current Working Directory: {os.getcwd()}")
print(f"DEBUG: .env file exists in CWD: {os.path.exists('.env')}")
# --- END NEW DEBUG PRINT STATEMENTS ---

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware

# --- Imports from your Backend package ---
from auth.routes import router as auth_router
from users.routes import router as users_router
from auth.oauth_routes import router as oauth_router
from auth.oauth_client import oauth # Corrected import - assuming this is correct

app = FastAPI()

# Add SessionMiddleware before CORSMiddleware if you want sessions to be available to CORS
app.add_middleware(
    SessionMiddleware,
    secret_key=os.getenv("SESSION_SECRET_KEY") # Use the secret key from environment variables
)

# --- IMPROVED allow_origins handling ---
allowed_origins = [
    "http://localhost:5173", # Explicitly allow localhost for development
]
frontend_url = os.getenv("FRONTEND_URL")
if frontend_url:
    allowed_origins.append(frontend_url)
else:
    print("WARNING: FRONTEND_URL environment variable is not set. Only http://localhost:5173 will be allowed for CORS.")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins, # Use the robust list
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(users_router, prefix="/users", tags=["users"])
app.include_router(oauth_router, prefix="/auth", tags=["oauth"]) # OAuth routes are grouped under /auth

@app.get("/")
def read_root():
    return {"message": "Welcome to FastAPI authentication and authorization example"}