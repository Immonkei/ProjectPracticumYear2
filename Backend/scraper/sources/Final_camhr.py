import os, csv, time
from datetime import datetime

import pandas as pd  # optional; safe to remove if unused
from bs4 import BeautifulSoup

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager


# -------------------- Config --------------------
class ScraperConfig:
    # Backend runner sets this; otherwise fallback to local outputs/
    OUTPUT_DIR = os.getenv(
        "SCRAPER_OUTPUT_DIR",
        os.path.join(os.path.dirname(__file__), "outputs")
    )
    SITE_KEY = "camhr"
    OUTPUT_FILENAME = f"{SITE_KEY}_{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}.csv"

    START_ID = 10608838
    END_ID   = 10608839
    BASE_URL = "https://www.camhr.com/a/job/{}"

    WAIT_TIMEOUT = 10
    DELAY = 0.2
    MAX_RETRIES = 2

    COLUMNS = [
        "Job Title", "Company Name", "Salary", "Year of Exp.",
        "Function", "Industry", "Qualification", "Location", "Job Requirements",
        "Publish Date", "Closing Date", "Link URL", "Source"
    ]


# -------------------- Driver --------------------
def _build_driver(headless: bool = True) -> webdriver.Chrome:
    opts = Options()
    if headless:
        opts.add_argument("--headless=new")
    opts.add_argument("--no-sandbox")
    opts.add_argument("--disable-gpu")
    opts.add_argument("--disable-dev-shm-usage")
    opts.add_argument("--window-size=1920,1080")

    service = Service(ChromeDriverManager().install())
    drv = webdriver.Chrome(service=service, options=opts)
    drv.set_page_load_timeout(60)
    drv.implicitly_wait(5)
    return drv


# -------------------- Helpers --------------------
def clean_text(text: str | None) -> str:
    if not text:
        return ""
    text = " ".join(str(text).strip().split())
    if text[:1] in "-–":
        text = text[1:].strip()
    return text


# -------------------- Scrape One Page --------------------
def scrape_job_page(driver: webdriver.Chrome, url: str, columns: list[str]) -> dict | None:
    for attempt in range(ScraperConfig.MAX_RETRIES + 1):
        try:
            driver.get(url)
            try:
                WebDriverWait(driver, ScraperConfig.WAIT_TIMEOUT).until(
                    EC.presence_of_element_located((By.CLASS_NAME, "job-header-content"))
                )
            except Exception:
                # still parse; page might be minimal but valid
                pass

            time.sleep(ScraperConfig.DELAY)
            soup = BeautifulSoup(driver.page_source, "html.parser")

            job_info = {col: "N/A" for col in columns}
            job_info["Source"] = "CamHR"
            job_info["Link URL"] = url

            # Job Title
            title_span = soup.find("span", class_="job-name-span")
            if title_span:
                job_info["Job Title"] = clean_text(title_span.text)

            # Company Name
            company_tag = soup.find("p", class_="mb-1 company-headbox")
            if company_tag:
                link = company_tag.find("a")
                if link:
                    job_info["Company Name"] = clean_text(link.text)

            # Job details table
            table = soup.find("table", class_="mailTable")
            if table:
                for row in table.find_all("tr"):
                    headers = row.find_all("th", class_="column")
                    data_cells = row.find_all("td")
                    for h, d in zip(headers, data_cells):
                        key = h.get_text(strip=True).lower()
                        val = clean_text(d.get_text())
                        if "year of exp" in key:
                            job_info["Year of Exp."] = val
                        elif "function" in key:
                            job_info["Function"] = val
                        elif "industry" in key:
                            job_info["Industry"] = val
                        elif "qualification" in key:
                            job_info["Qualification"] = val
                        elif "location" in key:
                            job_info["Location"] = val
                        elif "salary" in key:
                            job_info["Salary"] = val

            # Job Requirements
            for div in soup.find_all("div", class_="job-descript"):
                title = div.find("span", class_="descript-title")
                if title and "Job Requirements" in title.get_text():
                    req_div = div.find("div", class_="fs-14 descript-list")
                    if req_div:
                        job_info["Job Requirements"] = req_div.get_text(separator=" • ").strip()
                    break

            # Publish & Closing Dates
            send_date = soup.find("div", class_="send-date")
            if send_date:
                spans = send_date.find_all("span")
                if len(spans) >= 2:
                    job_info["Publish Date"] = clean_text(spans[0].get_text().split(":")[-1])
                    job_info["Closing Date"] = clean_text(spans[1].get_text().split(":")[-1])

            # Skip if clearly empty
            if job_info["Job Title"] == "N/A" and job_info["Company Name"] == "N/A":
                return None

            return job_info

        except Exception:
            if attempt == ScraperConfig.MAX_RETRIES:
                return None
            time.sleep(0.5)
            continue


# -------------------- Main --------------------
def main():
    cfg = ScraperConfig()
    os.makedirs(cfg.OUTPUT_DIR, exist_ok=True)
    out_path = os.path.join(cfg.OUTPUT_DIR, cfg.OUTPUT_FILENAME)

    driver = _build_driver(headless=True)
    scraped = skipped = 0

    try:
        file_exists = os.path.exists(out_path)
        with open(out_path, "a", newline="", encoding="utf-8-sig") as f:
            writer = csv.DictWriter(f, fieldnames=cfg.COLUMNS)
            if not file_exists:
                writer.writeheader()

            for job_id in range(cfg.START_ID, cfg.END_ID + 1):
                url = cfg.BASE_URL.format(job_id)
                print(f"[camhr] Scraping {url} ...", end=" ")
                data = scrape_job_page(driver, url, cfg.COLUMNS)
                if data:
                    writer.writerow(data)
                    scraped += 1
                    print("OK")
                else:
                    skipped += 1
                    print("SKIP")
    finally:
        try:
            driver.quit()
        except Exception:
            pass

    print(f"[camhr] done. scraped={scraped} skipped={skipped}")
    # IMPORTANT for backend runner:
    print(f"Data saved to: {out_path}")


if __name__ == "__main__":
    # make prints safe on Windows consoles
    os.environ.setdefault("PYTHONIOENCODING", "utf-8")
    os.environ.setdefault("PYTHONUTF8", "1")
    main()
