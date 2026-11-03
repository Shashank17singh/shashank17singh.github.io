const skills = [
  { category: "Languages", items: ["Python", "C++", "TypeScript", "SQL"] },
  {
    category: "AI and machine learning",
    items: ["PyTorch", "Scikit-learn", "XGBoost", "LangChain", "LangGraph", "Hugging Face", "ChromaDB", "Qdrant", "Ollama", "Faster-Whisper", "OpenCV"],
  },
  { category: "Systems and backend", items: ["C++17", "Multithreading", "FastAPI", "Flask", "REST APIs", "PostgreSQL", "Supabase"] },
  { category: "Cloud and DevOps", items: ["Docker", "AWS", "CI/CD", "GitHub Actions", "Nginx"] },
  { category: "Architecture and security", items: ["Microservices", "Distributed systems", "TCP/UDP", "TLS/SNI", "Cryptography (RSA/AES)", "Zero-Trust"] },
  { category: "Frontend and data", items: ["Next.js", "React", "Tailwind CSS", "Pandas", "NumPy"] },
];

export function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="head">
          <h2>What I build with</h2>
        </div>
        <ul className="rows">
          {skills.map((group) => (
            <li key={group.category}>
              <h3>{group.category}</h3>
              <ul className="inline-list">
                {group.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
