import os, csv
from datetime import datetime
from bs4 import BeautifulSoup
import requests

class ScraperConfig:
    OUTPUT_DIR = os.getenv("SCRAPER_OUTPUT_DIR", os.path.join(os.path.dirname(__file__), "outputs"))
    SITE_KEY = "jobify"
    OUTPUT_FILENAME = f"{SITE_KEY}_{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}.csv"
    BASE_URL = "https://www.jobify.com/job/{}"   # TODO: real Jobify URL pattern
    START_ID = 1
    END_ID = 1

    COLUMNS = [
        "Job Title", "Company Name", "Salary", "Year of Exp.",
        "Function", "Industry", "Qualification", "Location", "Job Requirements",
        "Publish Date", "Closing Date", "Link URL", "Source"
    ]


def clean(s):
    if not s:
        return ""
    s = " ".join(str(s).strip().split())
    return s[1:].strip() if s[:1] in "-–" else s


def scrape_job_page(job_id, columns):
    url = ScraperConfig.BASE_URL.format(job_id)
    try:
        r = requests.get(url, timeout=10)
        if r.status_code != 200:
            return None
        soup = BeautifulSoup(r.text, "html.parser")
    except Exception:
        return None

    row = {c: "N/A" for c in columns}
    row["Source"] = "Jobify"
    row["Link URL"] = url

    # TODO: Replace these selectors with real Jobify HTML structure
    title_el = soup.find(["h1", "h2"])
    company_el = soup.find("a", href=True)

    row["Job Title"] = clean(title_el.get_text()) if title_el else "N/A"
    row["Company Name"] = clean(company_el.get_text()) if company_el else "N/A"

    if row["Job Title"] == "N/A" and row["Company Name"] == "N/A":
        return None
    return row


def main():
    cfg = ScraperConfig()
    os.makedirs(cfg.OUTPUT_DIR, exist_ok=True)
    out_path = os.path.join(cfg.OUTPUT_DIR, cfg.OUTPUT_FILENAME)

    scraped, skipped = 0, 0
    file_exists = os.path.exists(out_path)
    with open(out_path, "a", newline="", encoding="utf-8-sig") as f:
        w = csv.DictWriter(f, fieldnames=cfg.COLUMNS)
        if not file_exists:
            w.writeheader()

        for job_id in range(cfg.START_ID, cfg.END_ID + 1):
            url = cfg.BASE_URL.format(job_id)
            print(f"[jobify] {url} ...", end=" ")
            data = scrape_job_page(job_id, cfg.COLUMNS)
            if data:
                w.writerow(data)
                scraped += 1
                print("ok")
            else:
                skipped += 1
                print("skip")

    print(f"[jobify] done. scraped={scraped} skipped={skipped}")
    print(f"Data saved to: {out_path}")


if __name__ == "__main__":
    main()
