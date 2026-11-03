type Project = {
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string | null;
  demoLabel?: string;
  live: boolean;
};

// The six the owner chose to show. "Live" means a running deployment a visitor can open today.
const projects: Project[] = [
  {
    title: "Hotseat",
    description: "A spoken mock interview that builds questions from your resume, follows up on your answers and scores each one.",
    tech: ["Next.js", "TypeScript", "Groq", "Whisper"],
    github: "https://github.com/Shashank17singh/Hotseat",
    demo: "https://hotseat-black-chi.vercel.app/",
    live: true,
  },
  {
    title: "UPI Mesh",
    description: "An offline-first payments backend with hybrid RSA-2048 and AES-256-GCM encryption, relayed over a simulated Bluetooth mesh.",
    tech: ["Python", "FastAPI", "RSA-2048", "AES-256-GCM"],
    github: "https://github.com/Shashank17singh/UPI-Mesh",
    demo: "https://upi-mesh.duckdns.org/",
    live: true,
  },
  {
    title: "CodeSync",
    description: "A browser code editor where a whole room types in one file, with live cursors, chat, history, sandboxed runs and an online judge.",
    tech: ["React", "TypeScript", "Yjs", "Fastify", "PostgreSQL", "Redis", "gVisor"],
    github: "https://github.com/Shashank17singh/CodeSync",
    demo: null,
    live: false,
  },
  {
    title: "CampusMind",
    description: "A college assistant that answers from official documents with citations, and plans study schedules and reminders through agents.",
    tech: ["Python", "FastAPI", "LangGraph", "React", "PostgreSQL", "Qdrant"],
    github: "https://github.com/Shashank17singh/CampusMind",
    demo: null,
    live: false,
  },
  {
    title: "DPI Engine",
    description: "A C++17 deep packet inspection engine that rebuilds TCP and UDP flows from PCAP captures and classifies traffic by TLS SNI and HTTP Host.",
    tech: ["C++17", "libpcap", "TLS/SNI", "Multithreading"],
    github: "https://github.com/Shashank17singh/DPI-Engine",
    demo: "https://github.com/Shashank17singh/DPI-Engine/blob/main/dpi-engine.png",
    demoLabel: "View output",
    live: false,
  },
  {
    title: "Your Own AI",
    description: "A vector database with HNSW, KD-Tree and brute-force search, a local RAG pipeline on Ollama, and a 2D PCA view.",
    tech: ["C++", "HNSW", "KD-Tree", "RAG", "Ollama"],
    github: "https://github.com/Shashank17singh/Your-Own-AI",
    demo: "https://github.com/Shashank17singh/Your-Own-AI/blob/main/Your-Own-AI.png",
    demoLabel: "View architecture",
    live: false,
  },
];

type Case = { title: string; text: string; facts: [string, string][]; image: string; width: number; height: number; alt: string; tall?: boolean };

const cases: Case[] = [
  {
    title: "Your Own AI",
    text: "Search the same vectors three ways and compare them, then ask a local model about the documents behind them.",
    facts: [["Indexes", "HNSW, KD-Tree, brute force"], ["Model", "Ollama, run locally"], ["Built in", "C++ with CMake"]],
    image: "/work/your-own-ai.png",
    width: 1280,
    height: 800,
    alt: "The Your Own AI dashboard: query controls, a 2D PCA plot of vectors in four clusters, and HNSW graph layers",
  },
  {
    title: "DPI Engine",
    text: "Two load balancers hand each flow to one of four fast-path threads, so a connection is never split across threads.",
    facts: [["Input", "PCAP captures"], ["Classifies by", "TLS SNI and HTTP Host"], ["Built in", "C++17"]],
    image: "/work/dpi-engine.png",
    width: 800,
    height: 1000,
    alt: "DPI Engine terminal output: 77 packets read, all forwarded, and per-thread dispatch counts",
    tall: true,
  },
  {
    title: "UPI Mesh",
    text: "A payment made offline is encrypted on the phone, passed along a mesh, and settled once, even if it arrives twice.",
    facts: [["Encryption", "RSA-2048 with AES-256-GCM"], ["Replay guard", "Ciphertext-hash idempotency"], ["Built in", "Python and FastAPI"]],
    image: "/work/upi-mesh.png",
    width: 2880,
    height: 1800,
    alt: "The UPI Mesh live demo's home screen",
  },
];

export function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="head">
          <h2>Six projects, two of them live</h2>
        </div>

        <ul className="ruled">
          {projects.map((project) => (
            <li key={project.title} className="work-row">
              <h3><a href={project.github} target="_blank" rel="noopener noreferrer">{project.title}</a></h3>
              <div>
                <p className="work-row__what">{project.description}</p>
                <p className="work-row__stack">{project.tech.join(", ")}</p>
              </div>
              <div className="work-row__side">
                <span className={project.live ? "tag tag--in" : "tag tag--out"}>{project.live ? "Live" : "Source"}</span>
                <div className="work-row__links">
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">{project.demoLabel ?? "Live demo"}</a>
                  )}
                  <a href={project.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div style={{ marginTop: "var(--space-3xl)" }}>
          {cases.map((item, index) => (
            <article key={item.title} className={index === 0 ? "case" : "case case--even"}>
              <div className="case__text">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <dl className="facts">
                  {item.facts.map(([term, value]) => (
                    <div key={term} style={{ display: "contents" }}>
                      <dt>{term}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <figure className="shot">
                <div className={item.tall ? "shot__frame shot__frame--tall" : "shot__frame"} data-slot={`case-${index + 1}`} data-kind="product" data-alt={item.alt}>
                  <img src={item.image} width={item.width} height={item.height} alt={item.alt} loading="lazy" />
                </div>
              </figure>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
