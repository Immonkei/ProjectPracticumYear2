# Factory to build a router for ONE site (jobify, camhr, workinga, bongthom)
from fastapi import APIRouter, UploadFile, File, HTTPException, BackgroundTasks, Query
from fastapi.responses import FileResponse
from typing import Optional
import os, shutil

from .runners import run_source, newest_csv_for_source, OUTPUT_DIR, SOURCES
from .csv_utils import (
    load_csv_rows, search_rows, paginate, read_csv_head,
    metrics_from_rows, standardize_rows
)

def make_site_router(source_key: str, prefix: str) -> APIRouter:
    """
    Creates routes:
      POST   /{prefix}/scrape
      GET    /{prefix}/latest-csv
      GET    /{prefix}/download
      POST   /{prefix}/upload-csv
      GET    /{prefix}/results   (?q, page, limit, format=standard)
      GET    /{prefix}/metrics
    """
    if source_key not in SOURCES:
        raise KeyError(f"Unknown source_key '{source_key}'")

    r = APIRouter(prefix=f"/{prefix}", tags=[prefix])

    @r.post("/scrape")
    async def scrape(background: BackgroundTasks):
        def _job():
            code, out_text, csv_path = run_source(source_key)
            if code != 0:
                print(f"[{source_key}] scraper failed. Tail: {out_text[-400:]}")
        background.add_task(_job)
        return {"status": "queued", "source": source_key}

    @r.get("/latest-csv")
    def latest_csv():
        path = newest_csv_for_source(source_key)
        if not path:
            raise HTTPException(404, "No CSV found yet")
        return {"csv_path": path}

    @r.get("/download")
    def download_latest_csv():
        path = newest_csv_for_source(source_key)
        if not path:
            raise HTTPException(404, "No CSV available")
        fname = os.path.basename(path)
        return FileResponse(path, filename=fname, media_type="text/csv")

    @r.post("/upload-csv")
    async def upload_csv(file: UploadFile = File(...)):
        if not file.filename.lower().endswith(".csv"):
            raise HTTPException(400, "Please upload a .csv file")
        os.makedirs(OUTPUT_DIR, exist_ok=True)
        save_path = os.path.join(OUTPUT_DIR, f"{source_key}__{file.filename}")
        with open(save_path, "wb") as f:
            shutil.copyfileobj(file.file, f)
        head = read_csv_head(save_path, limit=5)
        return {"columns": head["columns"], "rows": head["rows"]}

    @r.get("/results")
    def results(
        q: Optional[str] = None,
        page: int = Query(1, ge=1),
        limit: int = Query(20, ge=1, le=500),
        format: Optional[str] = Query(None, description="use 'standard' for canonical keys")
    ):
        path = newest_csv_for_source(source_key)
        if not path:
            raise HTTPException(404, "No CSV available for this site")
        headers, rows = load_csv_rows(path)
        filtered = search_rows(rows, q)
        if format == "standard":
            filtered = standardize_rows(headers, filtered, source_key=source_key)
        total, items = paginate(filtered, page, limit)
        return {"total": total, "page": page, "limit": limit, "items": items}

    @r.get("/metrics")
    def metrics():
        path = newest_csv_for_source(source_key)
        if not path:
            raise HTTPException(404, "No CSV available for this site")
        _, rows = load_csv_rows(path)
        return {"rows": metrics_from_rows(rows)["rows"]}

    return r
