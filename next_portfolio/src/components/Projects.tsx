type Project = {
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string | null;
  demoLabel?: string;
  live: boolean;
};

// Seven projects across systems, ML and full-stack. "Live" means a running deployment a visitor can open today.
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
    title: "TruthLens",
    description: "A multi-modal deepfake detection platform explaining visual, acoustic and text manipulations with Grad-CAM heatmaps, DCT spectra and HMAC-SHA256 signed PDF audit trails.",
    tech: ["PyTorch", "ONNX Runtime", "FastAPI", "React", "TypeScript", "Celery"],
    github: "https://github.com/Shashank17singh/TruthLens",
    demo: "https://truthlens-forensic.vercel.app/",
    live: true,
  },
  {
    title: "CodeSync",
    description: "A browser code editor where a whole room types in one file, with live cursors, chat, history, sandboxed runs and an online judge.",
    tech: ["React", "TypeScript", "Yjs", "Fastify", "Neon Postgres", "Redis", "gVisor"],
    github: "https://github.com/Shashank17singh/CodeSync",
    demo: "https://codesync-team.vercel.app",
    live: true,
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
    title: "CampusMind",
    description: "A college assistant that answers from official documents with citations, and plans study schedules and reminders through agents.",
    tech: ["Python", "FastAPI", "LangGraph", "React", "Supabase", "pgvector"],
    github: "https://github.com/Shashank17singh/CampusMind",
    demo: "https://campusmind-uol.vercel.app/",
    live: true,
  },
  {
    title: "Your Own AI",
    description: "A vector database with HNSW, KD-Tree and brute-force search, a local RAG pipeline on Ollama, and a 2D PCA view.",
    tech: ["C++", "HNSW", "KD-Tree", "RAG", "Ollama"],
    github: "https://github.com/Shashank17singh/Your-Own-AI",
    demo: "https://github.com/Shashank17singh/Your-Own-AI/blob/main/Your-Own-AI.png",
    demoLabel: "View output",
    live: false,
  },
];

type Case = { title: string; text: string; facts: [string, string][]; image: string; width: number; height: number; alt: string; tall?: boolean };

// Same order as the list above.
const cases: Case[] = [
  {
    title: "TruthLens",
    text: "Detects multi-modal deepfakes with spatial Grad-CAM heatmaps, 2D DCT spectral energy curves and HMAC-SHA256 signed PDF audit trails.",
    facts: [["Modality", "Image, audio and text"], ["Inference", "CPU-optimized ONNX Runtime"], ["Audit trail", "HMAC-SHA256 signed PDF"]],
    image: "/work/truthlens.png",
    width: 2880,
    height: 1800,
    alt: "The TruthLens forensic platform interface showing multi-modal inspection, probability gauges and explainability evidence",
  },
  {
    title: "UPI Mesh",
    text: "A payment made offline is encrypted on the phone, passed along a mesh, and settled once, even if it arrives twice.",
    facts: [["Encryption", "RSA-2048 with AES-256-GCM"], ["Replay guard", "Ciphertext-hash idempotency"], ["Built in", "Python and FastAPI"]],
    image: "/work/upi-mesh.png",
    width: 2880,
    height: 1800,
    alt: "The UPI Mesh dashboard after one payment settled: the three demo steps, the mesh devices and updated balances",
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
    title: "Your Own AI",
    text: "Search the same vectors three ways and compare them, then ask a local model about the documents behind them.",
    facts: [["Indexes", "HNSW, KD-Tree, brute force"], ["Model", "Ollama, run locally"], ["Built in", "C++ with CMake"]],
    image: "/work/your-own-ai.png",
    width: 2880,
    height: 1800,
    alt: "The Your Own AI dashboard after an HNSW search for \"binary tree\": the query on a 2D PCA plot, five nearest matches and a 40 microsecond latency",
  },
];

const PROJECT_ICONS: Record<string, React.ReactNode> = {
  Hotseat: (
    <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="7" fill="#0b0f1a" />
      <rect x="0.75" y="0.75" width="30.5" height="30.5" rx="6.25" stroke="rgba(249,115,22,0.25)" strokeWidth="1.5" />
      <path d="M6.5 23L12.5 18.5L18 20.5L25.5 9" stroke="#f97316" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="25.5" cy="9" r="2.5" fill="#f97316" />
    </svg>
  ),
  "UPI Mesh": (
    <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="7" fill="#18181b" />
      <rect x="0.75" y="0.75" width="30.5" height="30.5" rx="6.25" stroke="rgba(16,185,129,0.25)" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="3.5" fill="#10b981" />
      <circle cx="9" cy="10" r="2.5" fill="#8b5cf6" />
      <circle cx="23" cy="10" r="2.5" fill="#8b5cf6" />
      <circle cx="9" cy="22" r="2.5" fill="#8b5cf6" />
      <circle cx="23" cy="22" r="2.5" fill="#8b5cf6" />
      <path d="M11 11.5L14 14M21 11.5L18 14M11 20.5L14 18M21 20.5L18 18" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  TruthLens: (
    <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="7" fill="#0b1120" />
      <rect x="0.75" y="0.75" width="30.5" height="30.5" rx="6.25" stroke="rgba(56,189,248,0.25)" strokeWidth="1.5" />
      <path d="M16 6.5L8.5 10V15.5C8.5 20.5 11.8 24.8 16 26C20.2 24.8 23.5 20.5 23.5 15.5V10L16 6.5Z" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.5 15.5L15 18L20 13" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  CodeSync: (
    <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="7" fill="#1c1a17" />
      <rect x="0.75" y="0.75" width="30.5" height="30.5" rx="6.25" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
      <path d="M11 10L5.5 16L11 22M21 10L26.5 16L21 22M18 9L14 23" stroke="#d29a3c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "DPI Engine": (
    <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="7" fill="#0c1524" />
      <rect x="0.75" y="0.75" width="30.5" height="30.5" rx="6.25" stroke="rgba(6,182,212,0.25)" strokeWidth="1.5" />
      <path d="M7 11L16 6.5L25 11L16 15.5L7 11Z" stroke="#06b6d4" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M7 16.5L16 21L25 16.5" stroke="#3b82f6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 21.5L16 26L25 21.5" stroke="#06b6d4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  CampusMind: (
    <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="7" fill="#0f172a" />
      <rect x="0.75" y="0.75" width="30.5" height="30.5" rx="6.25" stroke="rgba(56,189,248,0.25)" strokeWidth="1.5" />
      <path d="M16 7L6.5 11.5L16 16L25.5 11.5L16 7Z" fill="#38bdf8" />
      <path d="M10 13.5V19C10 21.2 12.5 23 16 23C19.5 23 22 21.2 22 19V13.5L16 16.2L10 13.5Z" fill="#0284c7" />
      <path d="M25.5 12.5V18" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  "Your Own AI": (
    <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="7" fill="#181126" />
      <rect x="0.75" y="0.75" width="30.5" height="30.5" rx="6.25" stroke="rgba(168,85,247,0.25)" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="3.5" fill="#a855f7" />
      <circle cx="8" cy="14" r="2" fill="#e879f9" />
      <circle cx="24" cy="12" r="2" fill="#e879f9" />
      <circle cx="13" cy="24" r="2" fill="#e879f9" />
      <circle cx="23" cy="22" r="2" fill="#c084fc" />
      <path d="M9.8 14.5L13.2 15.5M18.8 15.5L22.2 12.8M15 19L13.8 22.2M18.2 17.8L21.5 20.8" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
};

export function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="head">
          <h2>Seven projects, five of them live</h2>
        </div>

        <ul className="ruled">
          {projects.map((project) => (
            <li key={project.title} className="work-row">
              <h3 className="work-row__title">
                <span className="project-badge" aria-hidden="true">
                  {PROJECT_ICONS[project.title]}
                </span>
                <a href={project.github} target="_blank" rel="noopener noreferrer">{project.title}</a>
              </h3>
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
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div style={{ marginTop: "var(--space-3xl)" }}>
          <div className="head">
            <h2>Four up close</h2>
          </div>
          {cases.map((item, index) => (
            <article key={item.title} className={index === 0 ? "case" : "case case--even"}>
              <div className="case__text">
                <h3 className="case__title">
                  <span className="project-badge" aria-hidden="true">
                    {PROJECT_ICONS[item.title]}
                  </span>
                  <span>{item.title}</span>
                </h3>
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
