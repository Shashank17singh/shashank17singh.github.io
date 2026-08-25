"""
ingest.py - builds the persistent Chroma vector index by scraping index.html.

Reads the portfolio HTML directly from the repo, extracts text from each
section, chunks it, and indexes it into ChromaDB. No manual knowledge_base.py
needed - just update your portfolio HTML and redeploy.

    python ingest.py
"""

import os
import re
from html.parser import HTMLParser

import chromadb
from sentence_transformers import SentenceTransformer

DB_PATH = "./chroma_db"
COLLECTION_NAME = "portfolio_knowledge"
EMBED_MODEL = "all-MiniLM-L6-v2"

# Check multiple locations: Docker container, local dev
_candidates = [
    os.path.join(os.path.dirname(__file__), "index.html"),       # Docker: /app/index.html
    os.path.join(os.path.dirname(__file__), "..", "index.html"),  # Local: ../index.html
]
HTML_PATH = next((p for p in _candidates if os.path.exists(p)), _candidates[-1])


class HTMLTextExtractor(HTMLParser):
    """Simple HTML parser that extracts visible text, grouped by <section> id."""

    SKIP_TAGS = {"script", "style", "noscript", "svg", "canvas"}

    def __init__(self):
        super().__init__()
        self._sections = {}
        self._current_section = "general"
        self._skip_depth = 0
        self._buf = []

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        if tag in self.SKIP_TAGS:
            self._skip_depth += 1
            return
        if tag == "section":
            self._flush()
            self._current_section = attrs_dict.get("id", "unnamed")

    def handle_endtag(self, tag):
        if tag in self.SKIP_TAGS:
            self._skip_depth = max(0, self._skip_depth - 1)
            return
        if tag == "section":
            self._flush()
            self._current_section = "general"

    def handle_data(self, data):
        if self._skip_depth > 0:
            return
        text = data.strip()
        if text:
            self._buf.append(text)

    def _flush(self):
        if self._buf:
            joined = " ".join(self._buf)
            joined = re.sub(r"\s+", " ", joined).strip()
            if joined:
                if self._current_section not in self._sections:
                    self._sections[self._current_section] = []
                self._sections[self._current_section].append(joined)
        self._buf = []

    def get_sections(self):
        self._flush()
        return self._sections


def extract_sections_from_html(html_path):
    """Parse the portfolio HTML and return a dict of section_id -> list of text blocks."""
    with open(html_path, "r", encoding="utf-8") as f:
        html = f.read()

    parser = HTMLTextExtractor()
    parser.feed(html)
    return parser.get_sections()


def chunk_text(text, max_chars=500):
    """Split a long text into smaller chunks at sentence boundaries."""
    sentences = re.split(r"(?<=[.!?])\s+", text)
    chunks = []
    current = ""
    for sentence in sentences:
        if len(current) + len(sentence) + 1 > max_chars and current:
            chunks.append(current.strip())
            current = sentence
        else:
            current = current + " " + sentence if current else sentence
    if current.strip():
        chunks.append(current.strip())
    return chunks


def build_documents(sections):
    """Convert extracted sections into document dicts for ChromaDB."""
    docs = []
    for section_id, text_blocks in sections.items():
        if section_id in ("general", "unnamed", "hero"):
            continue

        full_text = " ".join(text_blocks)
        if len(full_text) < 20:
            continue

        chunks = chunk_text(full_text, max_chars=500)
        for i, chunk in enumerate(chunks):
            docs.append({
                "id": f"{section_id}-{i}",
                "category": section_id,
                "text": chunk,
            })

    return docs


def main():
    html_path = os.path.abspath(HTML_PATH)
    print(f"Reading portfolio from: {html_path}")

    if not os.path.exists(html_path):
        print(f"ERROR: {html_path} not found!")
        print("Make sure index.html is accessible relative to the api/ directory.")
        return

    sections = extract_sections_from_html(html_path)
    print(f"Found {len(sections)} sections: {list(sections.keys())}")

    documents = build_documents(sections)
    print(f"Created {len(documents)} document chunks")

    for doc in documents:
        print(f"  [{doc['id']}] ({doc['category']}) {doc['text'][:80]}...")

    print(f"\nLoading embedding model '{EMBED_MODEL}'...")
    model = SentenceTransformer(EMBED_MODEL)

    print(f"Connecting to Chroma at {DB_PATH}...")
    client = chromadb.PersistentClient(path=DB_PATH)

    try:
        client.delete_collection(COLLECTION_NAME)
    except Exception:
        pass
    collection = client.create_collection(COLLECTION_NAME)

    texts = [doc["text"] for doc in documents]
    ids = [doc["id"] for doc in documents]
    metadatas = [{"category": doc["category"]} for doc in documents]

    print(f"Embedding {len(texts)} documents...")
    embeddings = model.encode(texts, show_progress_bar=True).tolist()

    collection.add(
        ids=ids,
        embeddings=embeddings,
        documents=texts,
        metadatas=metadatas,
    )

    print(f"Done. Indexed {collection.count()} chunks into '{COLLECTION_NAME}'.")


if __name__ == "__main__":
    main()
