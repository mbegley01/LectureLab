FROM python:3.12-slim

WORKDIR /sandbox

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY runner.py .

RUN useradd -m sandbox
USER sandbox

CMD ["python", "runner.py"]