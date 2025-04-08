from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.trustedhost import TrustedHostMiddleware
import os

script_dir = os.path.dirname(os.path.abspath(__file__))

app = FastAPI()
app.mount("/_next", StaticFiles(directory="./frontend-next/.next/static"), name="next")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from apktouyangtze import routes
