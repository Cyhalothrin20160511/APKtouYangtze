from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import os

script_dir = os.path.dirname(os.path.abspath(__file__))
static_dir = os.path.join(script_dir, "static")

app = FastAPI()
app.mount("/static", StaticFiles(directory=static_dir), name="static")

origins = [
    "http://localhost:3000",
    "https://apktouyangtze.schuletoushu.com",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from apktouyangtze import routes
