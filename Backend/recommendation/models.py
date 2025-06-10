
from pydantic import BaseModel
from typing import List

class RecommendedJob(BaseModel):
    """
    Pydantic model for a single recommended job.
    Matches the structure expected by your frontend.
    """
    title: str
    company: str
    location: str
    type: str
    salary: str
    skills: List[str]
    match: str  # e.g., "95%"
    posted: str # e.g., "2 days ago"
    # Consider adding a unique ID for the job if you have one in your database
    # id: int