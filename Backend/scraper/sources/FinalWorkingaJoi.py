import os
import csv
import time
from datetime import datetime

import pandas as pd  # you can remove if not used elsewhere
from bs4 import BeautifulSoup

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, WebDriverException
from webdriver_manager.chrome import ChromeDriverManager


class ScraperConfig:
    # If the backend runner sets SCRAPER_OUTPUT_DIR, use it. Else, use local "outputs" folder.
    OUTPUT_DIR = os.getenv("SCRAPER_OUTPUT_DIR", os.path.join(os.path.dirname(__file__), "outputs"))
    SITE_KEY = "workinga"

    # A timestamped file avoids append collisions when backend runs multiple times
    OUTPUT_FILENAME = f"{SITE_KEY}_{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}.csv"

    START_ID = 11954
    END_ID = 11954
    BASE_URL = "https://workingna.com/job/{}"
    WAIT_TIMEOUT = 10   # give selenium a bit more time
    DELAY = 0.2
    MAX_RETRIES = 2

    COLUMNS = [
        "Job Title", "Company Name", "Salary", "Year of Exp.",
        "Function", "Industry", "Qualification", "Location", "Job Requirements",
        "Publish Date", "Closing Date", "Link URL", "Source"
    ]


class JobScraper:
    def __init__(self, config: ScraperConfig):
        self.config = config
        os.makedirs(self.config.OUTPUT_DIR, exist_ok=True)
        self.output_path = os.path.join(self.config.OUTPUT_DIR, self.config.OUTPUT_FILENAME)
        self.driver = self._init_driver()
        self.scraped_count = 0
        self.skipped_count = 0

    def _init_driver(self) -> webdriver.Chrome:
        opts = Options()
        # Headless Chrome that works well on current versions
        opts.add_argument("--headless=new")
        opts.add_argument("--no-sandbox")
        opts.add_argument("--disable-gpu")
        opts.add_argument("--disable-dev-shm-usage")
        opts.add_argument("--window-size=1920,1080")
        # mild hardening against detection (optional)
        opts.add_experimental_option("excludeSwitches", ["enable-automation"])
        opts.add_experimental_option("useAutomationExtension", False)

        service = Service(ChromeDriverManager().install())
        drv = webdriver.Chrome(service=service, options=opts)
        drv.set_page_load_timeout(60)
        drv.implicitly_wait(5)
        return drv

    def clean_text(self, text):
        if not text:
            return ""
        text = " ".join(str(text).strip().split())
        if text.startswith("-") or text.startswith("–"):
            text = text[1:].strip()
        return text

    def is_page_not_found(self, soup: BeautifulSoup) -> bool:
        error_messages = ["n/a", "404", "doesn't exist", "no longer available"]
        page_text = soup.get_text().lower()
        return any(msg in page_text for msg in error_messages)

    def extract_element(self, soup: BeautifulSoup, find_params, next_element=None, attribute=None):
        try:
            element = soup.find(**find_params)
            if not element:
                return None
            if next_element:
                element = element.find_next(next_element)
                if not element:
                    return None
            return element.get(attribute) if attribute else element.get_text()
        except Exception:
            return None

    def extract_job_requirements(self, soup: BeautifulSoup) -> str:
        """
        Extract bullet points from ql-editor below a 'JOB REQUIREMENTS' heading.
        """
        try:
            headings = soup.find_all("p", class_="MuiTypography-root")
            for heading in headings:
                if heading.get_text(strip=True).lower() == "job requirements":
                    editor_div = heading.find_next("div", class_="ql-editor")
                    if editor_div:
                        ul = editor_div.find("ul")
                        if ul:
                            items = [self.clean_text(li.get_text()) for li in ul.find_all("li")]
                            items = [i for i in items if i.lower() not in ["not specified", "job detail"]]
                            return " • ".join(items) if items else "N/A"
            return "N/A"
        except Exception as e:
            print(f"[workinga] error extracting requirements: {e}")
            return "N/A"

    def scrape_job_page(self, job_id: int):
        url = self.config.BASE_URL.format(job_id)
        for attempt in range(self.config.MAX_RETRIES + 1):
            try:
                self.driver.get(url)
                try:
                    WebDriverWait(self.driver, self.config.WAIT_TIMEOUT).until(
                        EC.presence_of_element_located((By.CLASS_NAME, "MuiBox-root"))
                    )
                except TimeoutException:
                    soup = BeautifulSoup(self.driver.page_source, "html.parser")
                    if self.is_page_not_found(soup):
                        return None
                    # If not explicitly 404-ish, retry or fail out
                    raise

                time.sleep(self.config.DELAY)
                soup = BeautifulSoup(self.driver.page_source, "html.parser")
                if self.is_page_not_found(soup):
                    return None

                job_info = {col: "N/A" for col in self.config.COLUMNS}
                job_info["Source"] = "Workingna"
                job_info["Link URL"] = url

                job_info["Job Title"] = self.clean_text(self.extract_element(soup, {"class_": "css-97a38i"}))
                job_info["Company Name"] = self.clean_text(self.extract_element(soup, {"class_": "css-aabkpg"}, "h6"))

                salary_tag = soup.find("span", class_="css-10bh2m3")
                if salary_tag:
                    job_info["Salary"] = self.clean_text(salary_tag.get_text())

                # labels that appear as text then a following <p>
                label_fields = {
                    "Location": "Location",
                    "Closing Date": "Closing Date"
                }
                for field, label in label_fields.items():
                    job_info[field] = self.clean_text(self.extract_element(soup, {"string": label}, "p"))

                # Workingna usually lacks these; keep default N/A if absent
                job_info["Job Requirements"] = self.extract_job_requirements(soup)

                if job_info["Job Title"] == "N/A" and job_info["Company Name"] == "N/A":
                    return None

                return job_info

            except Exception:
                if attempt == self.config.MAX_RETRIES:
                    return None
                time.sleep(0.5)  # brief backoff and retry
                continue

    def save_to_csv(self, data: dict):
        file_exists = os.path.exists(self.output_path)
        with open(self.output_path, mode="a", newline="", encoding="utf-8-sig") as f:
            writer = csv.DictWriter(f, fieldnames=self.config.COLUMNS)
            if not file_exists:
                writer.writeheader()
            writer.writerow(data)

    def run(self):
        try:
            print(f"[workinga] saving to: {self.output_path}")
            for job_id in range(self.config.START_ID, self.config.END_ID + 1):
                print(f"[workinga] scraping job ID {job_id} ...", end=" ")
                job_data = self.scrape_job_page(job_id)
                if job_data:
                    self.scraped_count += 1
                    self.save_to_csv(job_data)
                    print("ok")
                else:
                    self.skipped_count += 1
                    print("skip")
            print(f"[workinga] done. scraped={self.scraped_count} skipped={self.skipped_count}")
        finally:
            try:
                self.driver.quit()
            except Exception:
                pass
        # IMPORTANT: tell the backend runner exactly where the CSV is
        print(f"Data saved to: {self.output_path}")


if __name__ == "__main__":
    cfg = ScraperConfig()
    scraper = JobScraper(cfg)
    scraper.run()
