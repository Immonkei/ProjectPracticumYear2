from fastapi import APIRouter, UploadFile, File, HTTPException, BackgroundTasks, Query
from fastapi.responses import FileResponse
from typing import Optional, List
import os, shutil

from .runners import run_source, newest_csv_for_source, SOURCES, OUTPUT_DIR
from .csv_utils import (
    load_csv_rows, search_rows, paginate, read_csv_head,
    metrics_from_rows, standardize_rows
)
from .schemas import RowsPage, HeadPreview, Metrics, SourceInfo

router = APIRouter()

@router.get("/sources", response_model=List[SourceInfo])
def list_sources():
    infos: List[SourceInfo] = []
    for key, script in SOURCES.items():
        infos.append(SourceInfo(key=key, script=script, latest_csv=newest_csv_for_source(key)))
    return infos

@router.post("/scrape/{source_key}")
async def scrape_source(source_key: str, background: BackgroundTasks):
    """
    Run one of your scripts (jobify | camhr | workinga | bongthom).
    Returns immediately (queued); poll /latest-csv/{source_key} or call /results.
    """
    if source_key not in SOURCES:
        raise HTTPException(404, f"Unknown source_key '{source_key}'")

    def _job():
        code, out_text, csv_path = run_source(source_key)
        if code != 0:
            print(f"[{source_key}] scraper failed. Tail: {out_text[-400:]}")

    background.add_task(_job)
    return {"status": "queued", "source": source_key}

@router.get("/latest-csv/{source_key}")
def latest_csv(source_key: str):
    path = newest_csv_for_source(source_key)
    if not path:
        raise HTTPException(404, "No CSV found yet")
    return {"csv_path": path}

@router.get("/download/{source_key}")
def download_latest_csv(source_key: str):
    path = newest_csv_for_source(source_key)
    if not path:
        raise HTTPException(404, "No CSV available")
    fname = os.path.basename(path)
    return FileResponse(path, filename=fname, media_type="text/csv")

@router.post("/upload-csv/{source_key}", response_model=HeadPreview)
async def upload_csv(source_key: str, file: UploadFile = File(...)):
    """
    Upload an existing CSV to 'sources/outputs/' so the API can serve/search it.
    Returns a small preview of the uploaded file.
    """
    if not file.filename.lower().endswith(".csv"):
        raise HTTPException(400, "Please upload a .csv file")

    os.makedirs(OUTPUT_DIR, exist_ok=True)
    save_path = os.path.join(OUTPUT_DIR, f"{source_key}__{file.filename}")
    with open(save_path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    head = read_csv_head(save_path, limit=5)
    return HeadPreview(columns=head["columns"], rows=head["rows"])

@router.get("/results/{source_key}", response_model=RowsPage)
def results(
    source_key: str,
    q: Optional[str] = None,
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=500),
    format: Optional[str] = Query(None, description="when 'standard', returns canonical keys")
):
    """
    Return rows from the newest CSV for a given source with optional search + pagination.
    Set ?format=standard to map headers like your screenshot to:
    title, company, salary, years_exp, function, industry, qualification,
    location, requirements, publish_date, closing_date, url, source
    """
    path = newest_csv_for_source(source_key)
    if not path:
        raise HTTPException(404, "No CSV available for this source")
    headers, rows = load_csv_rows(path)
    filtered = search_rows(rows, q)

    if format == "standard":
        # produce uniform keys for the UI
        filtered = standardize_rows(headers, filtered, source_key=source_key)

    total, items = paginate(filtered, page, limit)
    return RowsPage(total=total, page=page, limit=limit, items=items)

@router.get("/metrics/{source_key}", response_model=Metrics)
def metrics(source_key: str):
    path = newest_csv_for_source(source_key)
    if not path:
        raise HTTPException(404, "No CSV available for this source")
    _, rows = load_csv_rows(path)
    return Metrics(**metrics_from_rows(rows))
