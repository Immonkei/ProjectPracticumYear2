from typing import List
from recommendation.extractor import extract_cv_text
from recommendation.ml_engine import get_job_recommendations_from_cv_text
from recommendation.models import RecommendedJob
from fastapi import HTTPException, status # Import HTTPException for proper error propagation

async def process_cv_and_get_recommendations(file_content: bytes, file_extension: str) -> List[RecommendedJob]:
    """
    Extracts text from CV, gets recommendations from ML model, and returns them.
    """
    try:
        cv_text = extract_cv_text(file_content, file_extension)
    except HTTPException as e:
        # Re-raise HTTPException directly from the extractor for specific client errors
        raise e
    except Exception as e:
        # Catch any other unexpected errors during extraction
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An unexpected error occurred during CV text extraction: {e}"
        )

    if not cv_text.strip(): # Check if extracted text is empty or just whitespace
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No meaningful text could be extracted from the provided CV."
        )

    try:
        recommended_jobs = get_job_recommendations_from_cv_text(cv_text)
        return recommended_jobs
    except Exception as e:
        # Catch any errors during the ML model's recommendation process
        print(f"Error during ML model recommendation: {e}") # Log the actual error
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while generating job recommendations. Please try again."
        )