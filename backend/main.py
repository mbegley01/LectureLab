from fastapi import FastAPI
from pydantic import BaseModel
from runner import run_python, get_code

app = FastAPI()

class CodeRequest(BaseModel):
    code: str

@app.post("/run")
async def run(request: CodeRequest):
    return run_python(request.code)