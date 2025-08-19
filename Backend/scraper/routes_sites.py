# Builds one router per site and exports them for main.py to include
from fastapi import APIRouter
from .site_router_factory import make_site_router

jobify_router   = make_site_router("jobify",   "jobify")
camhr_router    = make_site_router("camhr",    "camhr")
workinga_router = make_site_router("workinga", "workinga")
bongthom_router = make_site_router("bongthom", "bongthom")

# Optionally, you can also expose an aggregator under /sites for discovery
sites_index = APIRouter(prefix="/sites", tags=["sites"])
@sites_index.get("")
def list_sites():
    return [
        {"key": "jobify",   "base": "/api/jobify"},
        {"key": "camhr",    "base": "/api/camhr"},
        {"key": "workinga", "base": "/api/workinga"},
        {"key": "bongthom", "base": "/api/bongthom"},
    ]
