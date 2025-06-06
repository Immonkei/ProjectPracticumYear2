# immonkei/job-recommendation/Job-Recommendation-main/Backend/auth/oauth_routes.py
import os
import logging
from fastapi import APIRouter, Depends, HTTPException, status, Request
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from .dependencies import get_db, create_access_token
from .models import Token
from users.models import User
from .oauth_client import oauth
from urllib.parse import urlencode

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
handler = logging.StreamHandler()
formatter = logging.Formatter('%(levelname)s: %(name)s: %(message)s')
handler.setFormatter(formatter)
if not logger.handlers:
    logger.addHandler(handler)

router = APIRouter()

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")
logger.info(f"FRONTEND_URL configured: {FRONTEND_URL}")


# Helper function to find a unique username
def find_unique_username(db: Session, base_username: str) -> str:
    username = base_username
    counter = 1
    while db.query(User).filter(User.username == username).first():
        username = f"{base_username}{counter}"
        counter += 1
    return username


# --- Google OAuth ---
@router.get('/google/login')
async def google_login(request: Request):
    logger.debug("Initiating Google login flow.")
    redirect_uri = request.url_for('google_auth')
    logger.debug(f"Google redirect_uri generated: {redirect_uri}")
    # Authlib's authorize_redirect automatically handles nonce generation and storage in session
    return await oauth.google.authorize_redirect(request, redirect_uri)

@router.get('/google/callback')
async def google_auth(request: Request, db: Session = Depends(get_db)):
    logger.debug("Google callback received.")
    try:
        token_response = await oauth.google.authorize_access_token(request)
        logger.debug(f"Google access token obtained. Token Response: {token_response}")

        # --- CRITICAL FIX: Extract id_token string and nonce explicitly ---
        id_token_string = token_response.get('id_token')
        if not id_token_string:
            raise ValueError("ID Token not found in Google token response.")
        
        # The nonce is stored in the session by Authlib's authorize_redirect
        # It's usually stored under a key derived from the client name, e.g., 'google_nonce'
        nonce_from_session = request.session.get(f'_oauth_nonce_{oauth.google.name}')
        
        if not nonce_from_session:
            logger.error("Nonce not found in session during Google callback. This is critical for OIDC security.")
            raise ValueError("Nonce missing from session. Possible session issue or replay attack.")

        # Pass the id_token string and the nonce explicitly
        user_info = await oauth.google.parse_id_token(id_token_string, nonce=nonce_from_session)
        logger.debug(f"Google user info parsed: {user_info}")

    except Exception as e:
        logger.error(f"Google authentication failed during token exchange or user info parsing: {e}", exc_info=True)
        error_params = urlencode({"error": f"Google Auth Failed: {e}"})
        return RedirectResponse(f"{FRONTEND_URL}/login?{error_params}")
    
    google_id = user_info['sub']
    google_email = user_info.get('email')
    base_username = user_info.get('name', google_email.split('@')[0] if google_email else 'google_user').replace(" ", "")
    
    logger.debug(f"Google ID: {google_id}, Email: {google_email}, Base Username: {base_username}")

    try:
        user = db.query(User).filter(User.google_id == google_id).first()
        if not user:
            logger.debug(f"User not found by google_id. Checking by email: {google_email}")
            if google_email:
                user = db.query(User).filter(User.email == google_email).first()
            
            if user:
                logger.info(f"Existing user '{user.username}' found by email. Linking Google ID.")
                user.google_id = google_id
                db.add(user)
                db.commit()
                db.refresh(user)
            else:
                unique_username = find_unique_username(db, base_username)
                logger.info(f"No existing user found. Creating new user for Google ID: {google_id} with username: {unique_username}")
                user = User(
                    username=unique_username,
                    email=google_email,
                    google_id=google_id,
                    is_active=True,
                    hashed_password="N/A"
                )
                db.add(user)
                db.commit()
                db.refresh(user)
        else:
            logger.info(f"User '{user.username}' found by existing Google ID.")
        
        access_token = create_access_token(data={"sub": user.username})
        logger.info(f"Google login successful for user: {user.username}. Redirecting to frontend.")
        success_params = urlencode({"token": access_token})
        return RedirectResponse(f"{FRONTEND_URL}/auth/callback?{success_params}")

    except IntegrityError as e:
        db.rollback()
        logger.error(f"Database Integrity Error during Google Auth: {e}", exc_info=True)
        error_params = urlencode({"error": "Registration failed due to duplicate entry. Please try again."})
        return RedirectResponse(f"{FRONTEND_URL}/login?{error_params}")
    except Exception as e:
        db.rollback()
        logger.error(f"Unexpected error during Google Auth: {e}", exc_info=True)
        error_params = urlencode({"error": f"An unexpected error occurred during Google login: {e}"})
        return RedirectResponse(f"{FRONTEND_URL}/login?{error_params}")


# --- GitHub OAuth ---
@router.get('/github/login')
async def github_login(request: Request):
    logger.debug("Initiating GitHub login flow.")
    redirect_uri = request.url_for('github_auth')
    logger.debug(f"GitHub redirect_uri generated: {redirect_uri}")
    return await oauth.github.authorize_redirect(request, redirect_uri)

@router.get('/github/callback')
async def github_auth(request: Request, db: Session = Depends(get_db)):
    logger.debug("GitHub callback received.")
    try:
        token = await oauth.github.authorize_access_token(request)
        logger.debug(f"GitHub access token obtained. Token: {token}")
    except Exception as e:
        logger.error(f"GitHub authentication failed during token exchange: {e}", exc_info=True)
        error_params = urlencode({"error": f"GitHub Auth Failed: {e}"})
        return RedirectResponse(f"{FRONTEND_URL}/login?{error_params}")
    
    try:
        resp = await oauth.github.get('user', token=token)
        profile = resp.json()
        logger.debug(f"GitHub user profile fetched: {profile}")
    except Exception as e:
        logger.error(f"GitHub user profile fetch failed: {e}", exc_info=True)
        error_params = urlencode({"error": f"GitHub Profile Fetch Error: {e}"})
        return RedirectResponse(f"{FRONTEND_URL}/login?{error_params}")

    github_id = str(profile['id'])
    github_username_base = profile['login']
    github_email = None

    try:
        emails_resp = await oauth.github.get('user/emails', token=token)
        emails = emails_resp.json()
        logger.debug(f"GitHub emails fetched: {emails}")
        for email_entry in emails:
            if email_entry.get('verified') and email_entry.get('primary'):
                github_email = email_entry['email']
                break
        if not github_email:
            logger.warning("No primary verified email found on GitHub for user.")
            error_params = urlencode({"error": "No primary verified email found on GitHub."})
            return RedirectResponse(f"{FRONTEND_URL}/login?{error_params}")
    except Exception as e:
        logger.error(f"Failed to fetch GitHub user emails: {e}", exc_info=True)
        error_params = urlencode({"error": f"GitHub Email Fetch Error: {e}"})
        return RedirectResponse(f"{FRONTEND_URL}/login?{error_params}")

    logger.debug(f"GitHub ID: {github_id}, Base Username: {github_username_base}, Email: {github_email}")

    try:
        user = db.query(User).filter(User.github_id == github_id).first()
        if not user:
            logger.debug(f"User not found by github_id. Checking by email: {github_email}")
            if github_email:
                user = db.query(User).filter(User.email == github_email).first()
            
            if user:
                logger.info(f"Existing user '{user.username}' found by email. Linking GitHub ID.")
                user.github_id = github_id
                db.add(user)
                db.commit()
                db.refresh(user)
            else:
                unique_username = find_unique_username(db, github_username_base)
                logger.info(f"No existing user found. Creating new user for GitHub ID: {github_id} with username: {unique_username}")
                user = User(
                    username=unique_username,
                    email=github_email,
                    github_id=github_id,
                    is_active=True,
                    hashed_password="N/A"
                )
                db.add(user)
                db.commit()
                db.refresh(user)
        else:
            logger.info(f"User '{user.username}' found by existing GitHub ID.")

        access_token = create_access_token(data={"sub": user.username})
        logger.info(f"GitHub login successful for user: {user.username}. Redirecting to frontend.")
        success_params = urlencode({"token": access_token})
        return RedirectResponse(f"{FRONTEND_URL}/auth/callback?{success_params}")

    except IntegrityError as e:
        db.rollback()
        logger.error(f"Database Integrity Error during GitHub Auth: {e}", exc_info=True)
        error_params = urlencode({"error": "Registration failed due to duplicate entry. Please try again."})
        return RedirectResponse(f"{FRONTEND_URL}/login?{error_params}")
    except Exception as e:
        db.rollback()
        logger.error(f"Unexpected error during GitHub Auth: {e}", exc_info=True)
        error_params = urlencode({"error": f"An unexpected error occurred during GitHub login: {e}"})
        return RedirectResponse(f"{FRONTEND_URL}/login?{error_params}")

