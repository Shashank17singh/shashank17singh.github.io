"""
ingest.py — builds the persistent Chroma vector index from knowledge_base.py.

Run this once before starting the server, and again any time you edit
knowledge_base.py:

    python ingest.py
"""

import chromadb
from sentence_transformers import SentenceTransformer

from knowledge_base import DOCUMENTS

DB_PATH = "./chroma_db"
COLLECTION_NAME = "portfolio_knowledge"
EMBED_MODEL = "all-MiniLM-L6-v2"  # small, fast, good enough for this corpus size


def main():
    print(f"Loading embedding model '{EMBED_MODEL}'...")
    model = SentenceTransformer(EMBED_MODEL)

    print(f"Connecting to Chroma at {DB_PATH}...")
    client = chromadb.PersistentClient(path=DB_PATH)

    # Fresh rebuild each time — drop the old collection if present.
    try:
        client.delete_collection(COLLECTION_NAME)
    except Exception:
        pass
    collection = client.create_collection(COLLECTION_NAME)

    texts = [doc["text"] for doc in DOCUMENTS]
    ids = [doc["id"] for doc in DOCUMENTS]
    metadatas = [{"category": doc["category"]} for doc in DOCUMENTS]

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
