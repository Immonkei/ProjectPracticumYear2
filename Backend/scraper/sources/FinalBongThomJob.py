import os
import csv
import time
from datetime import datetime
from bs4 import BeautifulSoup

# --- selenium + manager ---
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from webdriver_manager.chrome import ChromeDriverManager

class ScraperConfig:
    # Backend runner sets this env var; fallback to local outputs/
    OUTPUT_DIR = os.getenv("SCRAPER_OUTPUT_DIR", os.path.join(os.path.dirname(__file__), "outputs"))
    SITE_KEY = "bongthom"
    OUTPUT_FILENAME = f"{SITE_KEY}_{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}.csv"

    # adjust ranges/URLs to your needs
    START_ID = 1
    END_ID = 1
    BASE_URL = "https://www.bongthom.com/job/display-job-{}.html"

    WAIT_TIMEOUT = 10
    DELAY = 0.2
    MAX_RETRIES = 2

    COLUMNS = [
        "Job Title", "Company Name", "Salary", "Year of Exp.",
        "Function", "Industry", "Qualification", "Location", "Job Requirements",
        "Publish Date", "Closing Date", "Link URL", "Source"
    ]

def build_driver(headless: bool = True) -> webdriver.Chrome:
    opts = Options()
    if headless:
        opts.add_argument("--headless=new")       # modern headless
    opts.add_argument("--no-sandbox")
    opts.add_argument("--disable-gpu")
    opts.add_argument("--disable-dev-shm-usage")
    opts.add_argument("--window-size=1920,1080")
    # Optional hardening
    opts.add_experimental_option("excludeSwitches", ["enable-automation"])
    opts.add_experimental_option("useAutomationExtension", False)

    service = Service(ChromeDriverManager().install())
    drv = webdriver.Chrome(service=service, options=opts)
    drv.set_page_load_timeout(60)
    drv.implicitly_wait(5)
    return drv

def clean_text(s):
    if not s:
        return ""
    s = " ".join(str(s).strip().split())
    if s.startswith("-") or s.startswith("–"):
        s = s[1:].strip()
    return s

def scrape_job_page(driver: webdriver.Chrome, url: str, columns: list[str]) -> dict | None:
    """
    TODO: put your existing BongThom parsing here. Below is a safe default
    that won’t crash even if structure changes; replace selectors to match the site.
    """
    driver.get(url)
    try:
        # Wait for the content container (update selector if needed)
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, "body"))
        )
    except TimeoutException:
        return None

    time.sleep(0.2)
    soup = BeautifulSoup(driver.page_source, "html.parser")

    row = {c: "N/A" for c in columns}
    row["Source"] = "BongThom"
    row["Link URL"] = url

    # --- Replace these with the actual BongThom selectors you used before ---
    # Examples / placeholders:
    title_el = soup.find(["h1","h2"])
    company_el = soup.find("a", href=True)
    loc_el = soup.find(string=lambda t: t and "Location" in t)
    # ------------------------------------------------------------------------

    row["Job Title"] = clean_text(title_el.get_text()) if title_el else "N/A"
    row["Company Name"] = clean_text(company_el.get_text()) if company_el else "N/A"
    row["Location"] = clean_text(loc_el.parent.get_text()) if loc_el and getattr(loc_el, "parent", None) else "N/A"

    # Leave these as N/A unless you parse them:
    # Salary, Year of Exp., Function, Industry, Qualification, Job Requirements, Publish/Closing Date

    if row["Job Title"] == "N/A" and row["Company Name"] == "N/A":
        return None
    return row

def main():
    cfg = ScraperConfig()
    os.makedirs(cfg.OUTPUT_DIR, exist_ok=True)
    out_path = os.path.join(cfg.OUTPUT_DIR, cfg.OUTPUT_FILENAME)

    driver = build_driver(headless=True)
    scraped = 0
    skipped = 0
    try:
        file_exists = os.path.exists(out_path)
        with open(out_path, "a", newline="", encoding="utf-8-sig") as f:
            writer = csv.DictWriter(f, fieldnames=cfg.COLUMNS)
            if not file_exists:
                writer.writeheader()

            for job_id in range(cfg.START_ID, cfg.END_ID + 1):
                url = cfg.BASE_URL.format(job_id)
                print(f"[bongthom] scraping {url} ...", end=" ")
                data = None
                for attempt in range(cfg.MAX_RETRIES + 1):
                    try:
                        data = scrape_job_page(driver, url, cfg.COLUMNS)
                        break
                    except Exception:
                        time.sleep(0.5)
                        continue

                if data:
                    writer.writerow(data)
                    scraped += 1
                    print("ok")
                else:
                    skipped += 1
                    print("skip")
    finally:
        try:
            driver.quit()
        except Exception:
            pass

    print(f"[bongthom] done. scraped={scraped} skipped={skipped}")
    # Tell the backend runner exactly where the CSV is:
    print(f"Data saved to: {out_path}")

if __name__ == "__main__":
    main()
