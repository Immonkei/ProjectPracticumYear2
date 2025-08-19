
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
    term: str
    salary: str
    skills: List[str]
    match: str  # e.g., "95%"
    posted: str
    link: str 