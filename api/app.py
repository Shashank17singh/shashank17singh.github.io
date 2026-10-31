"""
Flask API serving the conversational AI backend for the portfolio.
Retrieves context from ChromaDB and streams responses using Groq.

Architecture note:
This backend operates as a stateless proxy between the React frontend and Groq's LLM.
It embeds incoming queries, retrieves relevant chunks from a local ChromaDB, 
constructs the prompt, and streams the generation back via Server-Sent Events (SSE).
"""
import json
import os

import chromadb
from chat_logic import (
    BUSY_MESSAGE,
    UNAVAILABLE_MESSAGE,
    RateLimiter,
    build_messages,
    client_id,
    validate_message,
)
from chromadb.config import Settings
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
CHAT_LIMIT_PER_CLIENT = 10
CHAT_LIMIT_OVERALL = 30
CHAT_LIMIT_WINDOW_SECONDS = 60

ALLOWED_ORIGINS = os.environ.get(
    "ALLOWED_ORIGINS", "https://shashank17singh.github.io"
).split(",") + [
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    "http://localhost:5500",
    "http://127.0.0.1:5500",
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
chat_limiter = RateLimiter(
    CHAT_LIMIT_PER_CLIENT, CHAT_LIMIT_OVERALL, CHAT_LIMIT_WINDOW_SECONDS
)

try:
    embed_model = SentenceTransformer(EMBED_MODEL)
    chroma_client = chromadb.PersistentClient(
        path=DB_PATH,
        settings=Settings(anonymized_telemetry=False)
    )
    collection = chroma_client.get_collection(COLLECTION_NAME)
except Exception as e:  # noqa: BLE001
    app.logger.error(f"WARNING: Failed to load AI models or database: {e}")
    embed_model = None
    collection = None

groq_client = None
try:
    groq_client = Groq(api_key=os.environ["GROQ_API_KEY"])
except KeyError:
    app.logger.error("GROQ_API_KEY is not set")
except Exception:
    app.logger.exception("Could not initialize the Groq client")


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
    message = data.get("message")
    error = validate_message(message)
    if error:
        return jsonify(error=error), 400
    client = client_id(request.headers.get("X-Forwarded-For"), request.remote_addr)
    if not chat_limiter.allow(client):
        return jsonify(error=BUSY_MESSAGE), 429
    message = message.strip()
    context = retrieve_context(message)
    messages = build_messages(
        SYSTEM_PROMPT, context, message, data.get("history"), MAX_HISTORY_TURNS
    )

    def generate():
        if groq_client is None or collection is None or embed_model is None:
            yield f"data: {json.dumps({'error': UNAVAILABLE_MESSAGE})}\n\n"
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
        except Exception:
            app.logger.exception("Groq API error")
            yield f"data: {json.dumps({'error': UNAVAILABLE_MESSAGE})}\n\n"

    return Response(
        generate(),
        mimetype="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", "5000")))