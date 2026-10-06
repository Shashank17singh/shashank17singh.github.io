FROM python:3.11-slim
WORKDIR /app
ENV HF_HOME=/app/cache
COPY api/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN python -c "from sentence_transformers import SentenceTransformer; SentenceTransformer('all-MiniLM-L6-v2')"
COPY api/app.py .
COPY api/ingest.py .
COPY api/portfolio_knowledge.md .
RUN python ingest.py
RUN mkdir -p /app/cache && chmod -R 777 /app/cache /app/chroma_db
EXPOSE 5000
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--timeout", "300", "app:app"]
