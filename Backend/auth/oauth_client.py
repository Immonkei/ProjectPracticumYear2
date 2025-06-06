# immonkei/job-recommendation/Job-Recommendation-main/Backend/auth/oauth_client.py
import os
from dotenv import load_dotenv
from authlib.integrations.starlette_client import OAuth

load_dotenv()

oauth = OAuth()

oauth.register(
    name='google',
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    # --- CRITICAL CHANGE FOR GOOGLE: Use server_metadata_url for OIDC discovery ---
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    # Remove these manual URLs as they will be discovered from metadata:
    # access_token_url='https://accounts.google.com/o/oauth2/token',
    # authorize_url='https://accounts.google.com/o/oauth2/auth',
    # api_base_url='https://www.googleapis.com/oauth2/v1/',
    # --- End CRITICAL CHANGE ---
    client_kwargs={'scope': 'openid email profile'},
)

oauth.register(
    name='github',
    client_id=os.getenv("GITHUB_CLIENT_ID"),
    client_secret=os.getenv("GITHUB_CLIENT_SECRET"),
    access_token_url='https://github.com/login/oauth/access_token',
    authorize_url='https://github.com/login/oauth/authorize',
    api_base_url='https://api.github.com/',
    client_kwargs={'scope': 'user:email'},
)
