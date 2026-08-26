"""
Flask backend for the portfolio RAG chatbot.

Endpoints
    POST /chat   SSE stream of JSON tokens
    GET  /health { "status": "ok" }

Usage
    python ingest.py   # build vector index (once)
    python app.py      # dev server on :5000
"""

import json
import os

import chromadb
from dotenv import load_dotenv
from flask import Flask, Response, jsonify, request
from flask_cors import CORS
from groq import Groq
from sentence_transformers import SentenceTransformer

load_dotenv()

DB_PATH = "./chroma_db"
COLLECTION_NAME = "portfolio_knowledge"
EMBED_MODEL = "all-MiniLM-L6-v2"
GROQ_MODEL = "openai/gpt-oss-20b"
TOP_K = 6
MAX_HISTORY_TURNS = 6

ALLOWED_ORIGINS = os.environ.get(
    "ALLOWED_ORIGINS", "https://shashank17singh.github.io"
).split(",") + [
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "null",
]

SYSTEM_PROMPT = """You are the AI assistant for Shashank Singh's professional portfolio website.
You converse with recruiters and visitors about Shashank - his skills, projects, experience, education,
and how to reach him - using ONLY the context provided below.

Tone & style:
- Be highly professional, articulate, and respectful.
- Write in a natural, human-like conversational tone, as if you are a knowledgeable colleague representing Shashank.
- Keep replies concise, structured, and easy to read (2-4 sentences). 
- Avoid slang, excessive enthusiasm, or overly casual phrasing.
- Speak about Shashank in the third person (he/his).

Rules:
- Answer only from the provided context. If the context doesn't cover it,
  say so honestly and professionally, and suggest reaching out to Shashank at shashanksingh1709@gmail.com.
- If asked about hiring or opportunities - state clearly that he is actively seeking full-time and
  internship roles in ML/AI/software engineering. Provide his email or LinkedIn (linkedin.com/in/shashank17singh).
- Never fabricate project details, metrics, or dates.
- Do NOT use markdown formatting (no **, *, #, ` etc.). Output plain text only.
"""

app = Flask(__name__)
CORS(app, origins=ALLOWED_ORIGINS)

try:
    print("Loading embedding model...")
    embed_model = SentenceTransformer(EMBED_MODEL)
    print("Connecting to Chroma...")
    chroma_client = chromadb.PersistentClient(path=DB_PATH)
    collection = chroma_client.get_collection(COLLECTION_NAME)
except Exception as e:
    print(f"WARNING: Failed to load AI models or database: {e}")
    embed_model = None
    collection = None

# DIAGNOSTICS FOR GROQ
groq_client = None
groq_error = ""

try:
    env_keys = list(os.environ.keys())
    print(f"DEBUG: All environment variables available to Python: {env_keys}")
    if "GROQ_API_KEY" not in os.environ:
        groq_error = "GROQ_API_KEY is completely missing from os.environ!"
    elif not os.environ["GROQ_API_KEY"]:
        groq_error = "GROQ_API_KEY is present but empty!"
    else:
        api_key = os.environ["GROQ_API_KEY"]
        if api_key.startswith("gsk_"):
            groq_client = Groq(api_key=api_key)
        else:
            groq_error = f"GROQ_API_KEY does not start with gsk_. It starts with: {api_key[:4]}..."
except Exception as e:
    groq_error = f"Exception while initializing Groq: {e}"

def retrieve_context(query: str, k: int = TOP_K) -> str:
    if embed_model is None or collection is None:
        return ""
    embedding = embed_model.encode([query]).tolist()
    results = collection.query(query_embeddings=embedding, n_results=k)
    chunks = results["documents"][0] if results["documents"] else []
    return "\n\n".join(chunks)

@app.route("/health")
def health():
    return jsonify(status="ok")

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json(silent=True) or {}
    message = (data.get("message") or "").strip()
    history = data.get("history") or []

    if not message:
        return jsonify(error="message is required"), 400
    if len(message) > 1000:
        return jsonify(error="message too long"), 400

    context = retrieve_context(message)
    messages = [{"role": "system", "content": f"{SYSTEM_PROMPT}\n\nContext:\n{context}"}]

    for turn in history[-MAX_HISTORY_TURNS:]:
        role, content = turn.get("role"), turn.get("content")
        if role in ("user", "assistant") and content:
            messages.append({"role": role, "content": content})

    messages.append({"role": "user", "content": message})

    def generate():
        if groq_client is None:
            yield f"data: {{\"error\": \"Groq Init Failed: {groq_error}\"}}\n\n"
            return
        if collection is None or embed_model is None:
            yield f"data: {{\"error\": \"Backend misconfigured. AI models failed to load.\"}}\n\n"
            return
        try:
            stream = groq_client.chat.completions.create(
                model=GROQ_MODEL,
                messages=messages,
                temperature=0.5,
                max_tokens=400,
                stream=True,
            )
            for chunk in stream:
                delta = chunk.choices[0].delta
                if delta and delta.content:
                    yield f"data: {json.dumps({'token': delta.content})}\n\n"
            yield "data: [DONE]\n\n"
        except Exception as e:
            app.logger.error("Groq API error: %s", e)
            yield f"data: {json.dumps({'error': f'generation failed: {e}'})}\n\n"

    return Response(
        generate(),
        mimetype="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
