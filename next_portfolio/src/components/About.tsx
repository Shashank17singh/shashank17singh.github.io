export function About() {
  return (
    <section id="about" className="section section--tight">
      <div className="container statement-row">
        <p className="statement">From packet inspection in modern C++ to RAG pipelines on Ollama and Gemini.</p>
        <div style={{ display: "grid", gap: "var(--space-md)" }}>
          <p>
            I am a final-year computer science (AI) student at the University of Lucknow, working on backend
            infrastructure, distributed systems and machine learning in production.
          </p>
          <p>I build secure, fast APIs with FastAPI, Docker and AWS, and retrieval with LangChain and ChromaDB.</p>
        </div>
      </div>
    </section>
  );
}
