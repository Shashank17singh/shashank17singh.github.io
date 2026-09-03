FROM python:3.11-slim
WORKDIR /app
ENV HF_HOME=/app/cache
COPY api/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN python -c "from sentence_transformers import SentenceTransformer; SentenceTransformer('all-MiniLM-L6-v2')"
COPY index.html /app/index.html
COPY api/app.py .
COPY api/ingest.py .
RUN python ingest.py
RUN mkdir -p /app/cache && chmod -R 777 /app/cache /app/chroma_db
EXPOSE 5000
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "1", "--threads", "2", "--timeout", "120", "app:app"]
