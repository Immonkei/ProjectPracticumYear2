"""
CSV helpers: load rows, filter, paginate, basic metrics + STANDARDIZER.
No external libs (uses Python csv + stdlib).
"""
import csv, os, re
from typing import List, Dict, Any, Optional, Tuple
from datetime import datetime

# -------- I/O --------

def read_csv_head(path: str, limit: int = 5) -> Dict[str, Any]:
    cols: List[str] = []
    rows: List[Dict[str, Any]] = []
    if not os.path.exists(path):
        return {"columns": cols, "rows": rows}
    with open(path, "r", encoding="utf-8", errors="ignore", newline="") as f:
        reader = csv.DictReader(f)
        cols = reader.fieldnames or []
        for i, r in enumerate(reader):
            if i >= limit:
                break
            rows.append(r)
    return {"columns": cols, "rows": rows}

def load_csv_rows(path: str) -> Tuple[List[str], List[Dict[str, Any]]]:
    with open(path, "r", encoding="utf-8", errors="ignore", newline="") as f:
        reader = csv.DictReader(f)
        cols = reader.fieldnames or []
        rows = list(reader)
    return cols or [], rows

# -------- Search & Pagination --------

def search_rows(rows: List[Dict[str, Any]], q: Optional[str]) -> List[Dict[str, Any]]:
    if not q:
        return rows
    pattern = re.compile(re.escape(q), re.IGNORECASE)
    out = []
    for r in rows:
        if any(pattern.search(str(v or "")) for v in r.values()):
            out.append(r)
    return out

def paginate(rows: List[Dict[str, Any]], page: int, limit: int) -> Tuple[int, List[Dict[str, Any]]]:
    total = len(rows)
    if limit <= 0:
        return total, rows
    start = (page - 1) * limit
    end = start + limit
    return total, rows[start:end]

def metrics_from_rows(rows: List[Dict[str, Any]]) -> Dict[str, Any]:
    return {
        "rows": len(rows)
    }

# -------- Standardization (fuzzy header mapping) --------

# Canonical keys we want for the UI
CANON_KEYS = [
    "title", "company", "salary", "years_exp", "function", "industry",
    "qualification", "location", "requirements", "publish_date",
    "closing_date", "url", "source"
]

# For fuzzy matching: normalize header -> key
def _norm(s: str) -> str:
    return re.sub(r"[^a-z0-9]", "", s.lower())

# For the BongThom-like headers shown in the screenshot:
# "Job Title", "Company", "Salary", "Year of Ex", "Function", "Industry",
# "Qualification", "Location", "Job Requi...", "Publish D...", "Closing D...",
# "Link URL", "Source"
FUZZY_MAP = {
    # left = canonical ; right = list of acceptable header patterns (normalized)
    "title":        ["jobtitle", "title"],
    "company":      ["company", "companyname"],
    "salary":       ["salary", "compensation"],
    "years_exp":    ["yearofex", "years", "experience", "yoe"],
    "function":     ["function", "role", "jobfunction"],
    "industry":     ["industry", "sector"],
    "qualification":["qualification", "education", "degree"],
    "location":     ["location", "city", "province"],
    "requirements": ["jobrequirement", "jobrequirements", "requirements", "requirement"],
    "publish_date": ["publishd", "publishdate", "posted", "postdate", "dateposted"],
    "closing_date": ["closingd", "closingdate", "deadline"],
    "url":          ["linkurl", "url", "link", "joburl"],
    "source":       ["source", "origin"],
}

DATE_IN_PATTERNS = [
    "%d-%b-%y",      # 27-Jul-25
    "%d-%b-%Y",      # 27-Jul-2025
    "%Y-%m-%d",      # 2025-07-27
    "%d/%m/%Y",      # 27/07/2025
    "%m/%d/%Y",      # 07/27/2025
    "%d-%m-%Y",
    "%m-%d-%Y",
]
def _parse_date(s: str) -> str:
    if not s or not str(s).strip():
        return ""
    txt = str(s).strip()
    # remove Excel artifacts like "#####"
    if set(txt) == {"#"}:
        return ""
    for fmt in DATE_IN_PATTERNS:
        try:
            dt = datetime.strptime(txt, fmt)
            return dt.strftime("%Y-%m-%d")
        except Exception:
            pass
    # fallback: return original
    return txt

def _build_header_map(headers: List[str]) -> Dict[str, str]:
    """
    Build a mapping: canonical_key -> actual_header_in_file
    using fuzzy matching on normalized names.
    """
    hnorm_to_h = {_norm(h): h for h in headers}
    mapping: Dict[str, str] = {}
    for canon, patterns in FUZZY_MAP.items():
        for pat in patterns:
            # direct equal
            if pat in hnorm_to_h:
                mapping[canon] = hnorm_to_h[pat]
                break
            # prefix or contains (more tolerant)
            for hnorm, real in hnorm_to_h.items():
                if hnorm.startswith(pat) or pat in hnorm:
                    mapping[canon] = real
                    break
            if canon in mapping:
                break
    return mapping

def standardize_rows(
    headers: List[str],
    rows: List[Dict[str, Any]],
    source_key: Optional[str] = None
) -> List[Dict[str, Any]]:
    """
    Return rows with canonical keys (missing fields become "").
    Dates are normalized to YYYY-MM-DD when possible.
    """
    if not rows:
        return []

    hmap = _build_header_map(headers)

    std: List[Dict[str, Any]] = []
    for r in rows:
        out: Dict[str, Any] = {}
        # copy with mapping (strings only)
        for canon in CANON_KEYS:
            real = hmap.get(canon)
            val = r.get(real, "") if real else ""
            out[canon] = (val or "").strip() if isinstance(val, str) else val

        # normalize date strings
        out["publish_date"] = _parse_date(out.get("publish_date", ""))
        out["closing_date"] = _parse_date(out.get("closing_date", ""))

        # add source_key if not present
        if not out.get("source"):
            out["source"] = source_key or ""

        std.append(out)
    return std
