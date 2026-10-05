"use client";

import { motion } from "framer-motion";

const skills = [
  {
    category: "Languages",
    items: ["Python", "C++", "TypeScript", "SQL"],
  },
  {
    category: "AI & Machine Learning",
    items: [
      "PyTorch",
      "Scikit-learn",
      "XGBoost",
      "LangChain",
      "LangGraph",
      "Hugging Face",
      "ChromaDB",
      "Qdrant",
      "Ollama",
      "Faster-Whisper",
      "OpenCV",
    ],
  },
  {
    category: "Systems & Backend",
    items: [
      "C++17",
      "Multithreading",
      "FastAPI",
      "Flask",
      "REST APIs",
      "PostgreSQL",
      "Supabase",
    ],
  },
  {
    category: "Cloud & DevOps",
    items: [
      "Docker",
      "AWS",
      "CI/CD",
      "GitHub Actions",
      "Nginx",
    ],
  },
  {
    category: "Architecture & Security",
    items: [
      "Microservices",
      "Distributed Systems",
      "TCP/UDP",
      "TLS/SNI",
      "Cryptography (RSA/AES)",
      "Zero-Trust",
    ],
  },
  {
    category: "Frontend & Data",
    items: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Pandas",
      "NumPy",
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-32 px-16 max-w-7xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="flex items-center gap-4 mb-16"
      >
        <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]"></div>
        <h2 className="text-4xl font-bold tracking-tight">
          Technical{" "}
          <span className="text-purple-400 font-mono italic">Arsenal</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skills.map((skillGroup, idx) => (
          <motion.div
            key={skillGroup.category}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
            <div className="relative h-full bg-slate-900/50 border border-slate-700/50 hover:border-purple-500/50 backdrop-blur-sm rounded-2xl p-6 transition-colors duration-500">
              <h3 className="text-lg font-semibold text-white mb-6 font-mono border-b border-slate-700/50 pb-4">
                {skillGroup.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((item) => (
                  <span
                    key={item}
                    className="bg-slate-800 text-slate-300 border border-slate-700 px-3 py-1.5 rounded-full text-sm hover:bg-purple-500/20 hover:text-purple-300 hover:border-purple-500/30 transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
