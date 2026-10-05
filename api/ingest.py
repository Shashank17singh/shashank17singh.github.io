"""Build the chatbot's Chroma collection from the maintained portfolio facts."""

from pathlib import Path

import chromadb
from sentence_transformers import SentenceTransformer

DB_PATH = "./chroma_db"
COLLECTION_NAME = "portfolio_knowledge"
EMBED_MODEL = "all-MiniLM-L6-v2"
KNOWLEDGE_PATH = Path(__file__).with_name("portfolio_knowledge.md")


def load_documents():
    """Split the Markdown knowledge base into heading-based retrieval chunks."""
    if not KNOWLEDGE_PATH.exists():
        raise FileNotFoundError(f"Portfolio knowledge file not found: {KNOWLEDGE_PATH}")

    sections = []
    heading = "Portfolio"
    body = []
    for line in KNOWLEDGE_PATH.read_text(encoding="utf-8").splitlines():
        if line.startswith("## "):
            if body:
                sections.append((heading, " ".join(body).strip()))
            heading, body = line[3:].strip(), []
        elif line.strip():
            body.append(line.strip())
    if body:
        sections.append((heading, " ".join(body).strip()))

    return [
        {
            "id": f"fact-{index}",
            "category": heading.lower(),
            "text": f"{heading}: {text}",
        }
        for index, (heading, text) in enumerate(sections)
        if text
    ]


def main():
    documents = load_documents()
    print(f"Loaded {len(documents)} portfolio knowledge chunks")
    model = SentenceTransformer(EMBED_MODEL)
    client = chromadb.PersistentClient(path=DB_PATH)
    try:
        client.delete_collection(COLLECTION_NAME)
    except Exception:
        pass
    collection = client.create_collection(COLLECTION_NAME)
    collection.add(
        ids=[document["id"] for document in documents],
        embeddings=model.encode(
            [document["text"] for document in documents], show_progress_bar=True
        ).tolist(),
        documents=[document["text"] for document in documents],
        metadatas=[{"category": document["category"]} for document in documents],
    )
    print(f"Indexed {collection.count()} chunks into '{COLLECTION_NAME}'.")


if __name__ == "__main__":
    main()
