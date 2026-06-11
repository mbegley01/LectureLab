from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from runner import run_python

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
    ],
    allow_methods=["POST", "OPTIONS"],
    allow_headers=["*"],
)

class CodeRequest(BaseModel):
    code: str

@app.get("/")
def health():
    """So localhost:8000 shows something useful in the browser."""
    return {"status": "ok", "message": "Lecture Lab API — use POST /run"}


@app.post("/run")
async def run(request: CodeRequest):
    return run_python(request.code)