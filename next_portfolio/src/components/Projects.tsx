"use client";

import { motion } from "framer-motion";
import { ExternalLink, GitBranch, FolderGit2 } from "lucide-react";

type Project = {
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string | null;
  demoLabel?: string;
  color: string;
  hoverColor: string;
};

const projects: Project[] = [
  {
    title: "DPI Engine - Deep Packet Inspection",
    description:
      "High-performance C++17 inspection engine that dissects PCAP captures, reconstructs TCP/UDP flows, classifies traffic via TLS SNI and HTTP Host headers, and enforces configurable blocking rules.",
    tech: ["C++17", "libpcap", "TLS/SNI", "Multithreading"],
    github: "https://github.com/Shashank17singh/DPI-Engine",
    demo: "https://github.com/Shashank17singh/DPI-Engine/blob/main/dpi-engine.png",
    demoLabel: "View Output",
    color: "from-blue-500/20 to-cyan-500/20",
    hoverColor: "group-hover:border-cyan-500/50",
  },
  {
    title: "Your Own AI - Vector Database",
    description:
      "Multi-algorithm vector database supporting HNSW, KD-Tree, and brute-force search, paired with Ollama-backed local RAG, REST API endpoints, automated benchmarks, and 2D PCA visualization.",
    tech: ["C++", "HNSW", "KD-Tree", "RAG", "Ollama"],
    github: "https://github.com/Shashank17singh/Your-Own-AI",
    demo: "https://github.com/Shashank17singh/Your-Own-AI/blob/main/Your-Own-AI.png",
    demoLabel: "View Architecture",
    color: "from-indigo-500/20 to-purple-500/20",
    hoverColor: "group-hover:border-purple-500/50",
  },
  {
    title: "UPI Mesh - Offline-First Payments",
    description:
      "Connectivity-resilient FastAPI backend powering UPI-style transactions with hybrid RSA-2048/AES-256-GCM cryptography, simulated Bluetooth mesh relay, and ciphertext-hash idempotency.",
    tech: ["Python", "FastAPI", "RSA-2048", "AES-256-GCM"],
    github: "https://github.com/Shashank17singh/UPI-Mesh",
    demo: "https://upi-mesh.duckdns.org/",
    color: "from-rose-500/20 to-orange-500/20",
    hoverColor: "group-hover:border-orange-500/50",
  },
  {
    title: "Restaurant Agent",
    description:
      "Conversational AI ordering system built on LangGraph and Gemini, featuring Pydantic tool calling, multi-turn memory persistence, and responsive Streamlit interface.",
    tech: ["LangGraph", "Gemini", "FastAPI", "Pydantic", "Streamlit"],
    github: "https://github.com/Shashank17singh/Restaurant-Agent",
    demo: "https://restaurants-agents.streamlit.app/",
    color: "from-amber-500/20 to-orange-500/20",
    hoverColor: "group-hover:border-amber-500/50",
  },
  {
    title: "YouTube Scrapper - Multi-Playlist RAG",
    description:
      "Playlist-aware RAG pipeline that transcribes YouTube videos via Faster-Whisper, indexes content with BAAI/bge-m3 embeddings in Qdrant, and returns timestamp-grounded answers.",
    tech: ["RAG", "Qdrant", "Faster-Whisper", "Python"],
    github: "https://github.com/Shashank17singh/Youtube-Scrapper",
    demo: "https://youtubescrapper-mb60.onrender.com/",
    color: "from-violet-500/20 to-purple-500/20",
    hoverColor: "group-hover:border-violet-500/50",
  },
  {
    title: "Code Sentinel",
    description:
      "Evidence-driven integrity triage system for coding assessments, combining MOSS-style fingerprinting with Groq LLM investigation and interactive Streamlit dashboards.",
    tech: ["Python", "Streamlit", "Groq LLM", "MOSS", "Pytest", "Mypy"],
    github: "https://github.com/Shashank17singh/Code-Sentinel",
    demo: "https://code-sentinel.streamlit.app/",
    demoLabel: "Live demo",
    color: "from-blue-500/20 to-purple-500/20",
    hoverColor: "group-hover:border-purple-500/50",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-32 px-16 max-w-7xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="flex items-center gap-4 mb-16"
      >
        <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
        <h2 className="text-4xl font-bold tracking-tight">
          Featured{" "}
          <span className="text-cyan-400 font-mono italic">Projects</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15 }}
            className={`group relative h-full`}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${project.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}
            ></div>
            <div
              className={`relative h-full bg-slate-900/80 border border-slate-700/50 backdrop-blur-sm rounded-2xl p-8 flex flex-col transition-all duration-500 ${project.hoverColor} group-hover:-translate-y-2`}
            >
              <div className="mb-6">
                <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                  <FolderGit2 className="w-8 h-8 text-cyan-400" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                {project.title}
              </h3>
              <p className="text-slate-400 leading-relaxed mb-8 flex-grow">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono text-slate-300 bg-slate-800/50 px-2 py-1 rounded border border-slate-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex gap-4 text-sm font-medium">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-slate-300 hover:text-white"
                >
                  GitHub <GitBranch className="h-4 w-4" />
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300"
                  >
                    {project.demoLabel ?? "Live demo"}{" "}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
