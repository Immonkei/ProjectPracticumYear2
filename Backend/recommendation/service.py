# Backend/recommendation/service.py

from typing import List
from recommendation.extractor import extract_cv_text
from recommendation.ml_engine import (
    get_job_recommendations_from_cv_text,
    initialize_ml_components
)
from recommendation.models import RecommendedJob
from fastapi import HTTPException, status

# Initialize ML components when the service starts
initialize_ml_components()

async def process_cv_and_get_recommendations(file_content: bytes, file_extension: str) -> List[RecommendedJob]:
    """Main service function to process CV and get recommendations"""
    try:
        # Extract text from CV
        cv_text = extract_cv_text(file_content, file_extension)
        
        if not cv_text.strip():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No meaningful text could be extracted from the provided CV."
            )
        
        # Get recommendations from ML engine
        recommended_jobs = get_job_recommendations_from_cv_text(cv_text)
        return recommended_jobs
        
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Error during recommendation process: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while generating job recommendations."
        )