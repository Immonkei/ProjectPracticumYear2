"""
Run your CSV scrapers and locate their CSV output.
No DB; results stay as CSV files under outputs/.
"""
import os, sys, time, glob, subprocess
from typing import Optional, Tuple

ROOT = os.path.dirname(__file__)
SOURCES_DIR = os.path.join(ROOT, "sources")
OUTPUT_DIR = os.path.join(SOURCES_DIR, "outputs")
os.makedirs(OUTPUT_DIR, exist_ok=True)

SOURCES = {
    "jobify":   os.path.join(SOURCES_DIR, "FinalJobifyJob.py"),
    "workinga": os.path.join(SOURCES_DIR, "FinalWorkingaJoi.py"),
    "camhr":    os.path.join(SOURCES_DIR, "Final_camhr.py"),
    "bongthom": os.path.join(SOURCES_DIR, "FinalBongThomJob.py"),
}

def newest_csv_for_source(source_key: str) -> Optional[str]:
    """
    Newest *.csv in sources/ or sources/outputs/.
    """
    candidates = []
    for d in (SOURCES_DIR, OUTPUT_DIR):
        candidates += glob.glob(os.path.join(d, "*.csv"))
        candidates += glob.glob(os.path.join(d, f"{source_key}*.csv"))
    if not candidates:
        return None
    candidates.sort(key=os.path.getmtime)
    return candidates[-1]

def run_source(source_key: str, timeout: int = 1800) -> Tuple[int, str, Optional[str]]:
    """
    Execute the scraper script and capture stdout.
    We try to detect 'Data saved to: <path>'. If not found, we use newest CSV.
    """
    script = SOURCES.get(source_key)
    if not script or not os.path.exists(script):
        raise FileNotFoundError(f"Unknown or missing script for '{source_key}': {script}")

    env = os.environ.copy()
    env["SCRAPER_OUTPUT_DIR"] = OUTPUT_DIR  # if your script wants to honor it
    env["PYTHONIOENCODING"] = "utf-8"
    env["PYTHONUTF8"] = "1"

    proc = subprocess.Popen(
        [sys.executable, script],
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        cwd=os.path.dirname(script),
        env=env,
    )

    lines = []
    start = time.time()
    while True:
        if proc.poll() is not None:
            break
        if time.time() - start > timeout:
            proc.kill()
            raise TimeoutError(f"Scraper '{source_key}' exceeded {timeout}s")
        line = proc.stdout.readline()
        if line:
            lines.append(line)
        else:
            time.sleep(0.05)

    rest = proc.stdout.read() or ""
    if rest:
        lines.append(rest)
    out = "".join(lines)

    # detect "Data saved to:"
    detected = None
    for ln in reversed(out.splitlines()):
        if "Data saved to:" in ln:
            detected = ln.split("Data saved to:", 1)[1].strip().strip('"').strip("'")
            break

    if not detected:
        detected = newest_csv_for_source(source_key)

    return proc.returncode or 0, out, detected
