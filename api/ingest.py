import os
import re
from html.parser import HTMLParser
import chromadb
from sentence_transformers import SentenceTransformer

DB_PATH = "./chroma_db"
COLLECTION_NAME = "portfolio_knowledge"
EMBED_MODEL = "all-MiniLM-L6-v2"
_candidates = [
    os.path.join(os.path.dirname(__file__), "index.html"),
    os.path.join(os.path.dirname(__file__), "..", "index.html"),
]
HTML_PATH = next((p for p in _candidates if os.path.exists(p)), _candidates[-1])


def get_text(html_fragment):
    text = re.sub(r"<[^>]+>", " ", html_fragment)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def extract_project_cards(html):
    cards = re.findall(
        r'<div class="project-card[^"]*">(.*?)</div>\s*</div>', html, re.DOTALL
    )
    projects = []
    for i, card in enumerate(cards):
        title_m = re.search(r'class="project-title">(.*?)</div>', card, re.DOTALL)
        desc_m = re.search(r'class="project-desc">(.*?)</div>', card, re.DOTALL)
        tag_m = re.search(r'class="project-tag">(.*?)</div>', card, re.DOTALL)
        stack_m = re.search(r'class="project-stack">(.*?)</div>', card, re.DOTALL)
        github_m = re.search(r'href="(https://github\.com/[^"]+)"', card)
        demo_m = re.search(
            r'href="(https://(?!github)[^"]+)"[^>]*class="project-link demo"', card
        )
        title = get_text(title_m.group(1)) if title_m else f"Project {i+1}"
        desc = get_text(desc_m.group(1)) if desc_m else ""
        tag = get_text(tag_m.group(1)) if tag_m else ""
        stack_html = stack_m.group(1) if stack_m else ""
        stack_pills = re.findall(r'class="stack-pill">(.*?)</span>', stack_html)
        stack = ", ".join(stack_pills)
        github = github_m.group(1) if github_m else ""
        demo = demo_m.group(1) if demo_m else ""
        parts = [f"Project: {title}"]
        if tag:
            parts.append(f"Category: {tag}")
        if desc:
            parts.append(desc)
        if stack:
            parts.append(f"Tech stack: {stack}")
        if github:
            parts.append(f"GitHub: {github}")
        if demo:
            parts.append(f"Live demo: {demo}")
        text = " | ".join(parts)
        projects.append(
            {
                "id": f"project-{i}",
                "category": "project",
                "text": text,
            }
        )
    return projects


def extract_section_text(html, section_id):
    section_m = re.search(
        rf'<section\s+id="{section_id}"[^>]*>(.*?)</section>', html, re.DOTALL
    )
    if not section_m:
        return []
    raw = section_m.group(1)
    raw = re.sub(
        r"<(script|style|noscript|svg|canvas)[^>]*>.*?</\1>", "", raw, flags=re.DOTALL
    )
    text = get_text(raw)
    if len(text) < 30:
        return []
    sentences = re.split(r"(?<=[.!?])\s+", text)
    chunks, current = [], ""
    for s in sentences:
        if len(current) + len(s) + 1 > 500 and current:
            chunks.append(current.strip())
            current = s
        else:
            current = (current + " " + s).strip() if current else s
    if current.strip():
        chunks.append(current.strip())
    return chunks


def main():
    html_path = os.path.abspath(HTML_PATH)
    print(f"Reading portfolio from: {html_path}")
    if not os.path.exists(html_path):
        print(f"ERROR: {html_path} not found!")
        return
    with open(html_path, "r", encoding="utf-8") as f:
        html = f.read()
    documents = []
    project_docs = extract_project_cards(html)
    print(f"Found {len(project_docs)} project cards")
    documents.extend(project_docs)
    for section_id in ("about", "skills", "experience", "certifications", "contact"):
        chunks = extract_section_text(html, section_id)
        for i, chunk in enumerate(chunks):
            documents.append(
                {
                    "id": f"{section_id}-{i}",
                    "category": section_id,
                    "text": chunk,
                }
            )
        print(f"  [{section_id}] {len(chunks)} chunks")
    if project_docs:
        names = [
            re.match(r"Project: ([^|]+)", d["text"]).group(1).strip()
            for d in project_docs
            if re.match(r"Project: ([^|]+)", d["text"])
        ]
        summary = f"Shashank has built {len(names)} projects: " + "; ".join(names) + "."
        documents.append(
            {
                "id": "projects-summary",
                "category": "project",
                "text": summary,
            }
        )
        print(f"  [projects-summary] {summary[:100]}...")
    print(f"\nTotal: {len(documents)} documents")
    for doc in documents:
        print(f"  [{doc['id']}] {doc['text'][:90]}...")
    print(f"\nLoading embedding model '{EMBED_MODEL}'...")
    model = SentenceTransformer(EMBED_MODEL)
    print(f"Connecting to Chroma at {DB_PATH}...")
    client = chromadb.PersistentClient(path=DB_PATH)
    try:
        client.delete_collection(COLLECTION_NAME)
    except Exception:
        pass
    collection = client.create_collection(COLLECTION_NAME)
    texts = [d["text"] for d in documents]
    ids = [d["id"] for d in documents]
    metadatas = [{"category": d["category"]} for d in documents]
    print(f"Embedding {len(texts)} documents...")
    embeddings = model.encode(texts, show_progress_bar=True).tolist()
    collection.add(ids=ids, embeddings=embeddings, documents=texts, metadatas=metadatas)
    print(f"Done. Indexed {collection.count()} chunks into '{COLLECTION_NAME}'.")


if __name__ == "__main__":
    main()
