# Backend/recommendation/routes.py

import os
from fastapi import APIRouter, UploadFile, File, HTTPException, status
from typing import List
from recommendation.models import RecommendedJob
from recommendation.service import process_cv_and_get_recommendations

router = APIRouter(
    prefix="/recommendations", # All routes in this file will start with /recommendations
    tags=["Recommendations"], # Tag for Swagger UI documentation
)

@router.post("/", response_model=List[RecommendedJob])
async def recommend_jobs_endpoint(cv_file: UploadFile = File(...)):
    """
    Receives a CV file, extracts text, uses the ML model to get recommendations,
    and returns a list of recommended jobs.
    """
    allowed_extensions = {".pdf", ".doc", ".docx"} # .doc is handled as unsupported by extractor
    file_extension = os.path.splitext(cv_file.filename)[1].lower()

    if file_extension not in allowed_extensions:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported file type. Please upload a PDF, DOC, or DOCX file."
        )
    
    # You might also want to check file size limits here before reading:
    # MAX_FILE_SIZE_MB = 10
    # if cv_file.size > MAX_FILE_SIZE_MB * 1024 * 1024:
    #     raise HTTPException(
    #         status_code=status.HTTP_413_PAYLOAD_TOO_LARGE,
    #         detail=f"File too large. Max size: {MAX_FILE_SIZE_MB}MB"
    #     )

    # Read file content
    try:
        file_content = await cv_file.read()
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Could not read file content. Please try again."
        )

    # Process CV and get recommendations through the service layer
    try:
        recommended_jobs = await process_cv_and_get_recommendations(file_content, file_extension)
        return recommended_jobs
    except HTTPException as e:
        # Re-raise HTTPExceptions (from extractor or service) directly
        raise e
    except Exception as e:
        # Catch any unexpected errors that weren't caught by service/extractor
        print(f"Unhandled error in recommend_jobs_endpoint: {e}") # Log the error
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected server error occurred during job recommendation."
        )

# --- Endpoint for "Save Job" Functionality (Placeholder for later) ---
# You'll likely need user authentication for this.
# @router.post("/save-job/{job_id}")
# async def save_job_to_profile(job_id: int, current_user: int = Depends(get_current_user_id)):
#     """
#     Saves a job to the user's profile.
#     """
#     # In a real app, you'd get the current authenticated user's ID
#     # and save the job_id associated with that user in your database.
#     # This assumes you have user models and authentication set up.
#     print(f"User {current_user} is trying to save job {job_id}")
#     # Example: Add database logic here
#     # db_session.add(UserSavedJob(user_id=current_user, job_id=job_id))
#     # await db_session.commit()
#     return {"message": f"Job {job_id} saved successfully to user profile."}