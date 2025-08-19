from pydantic import BaseModel
from typing import Any, Dict, List, Optional

class SourceInfo(BaseModel):
    key: str
    script: str
    latest_csv: Optional[str] = None

class RowsPage(BaseModel):
    total: int
    page: int
    limit: int
    items: List[Dict[str, Any]]

class HeadPreview(BaseModel):
    columns: List[str]
    rows: List[Dict[str, Any]]

class Metrics(BaseModel):
    rows: int
