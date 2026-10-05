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

const projects: Project[] = [  {
    title: "DPI Engine - Deep Packet Inspection",
    description: "C++17 deep packet inspection engine that analyzes PCAP captures, reconstructs TCP/UDP flows, classifies traffic through TLS SNI and HTTP Host inspection, and supports configurable blocking rules.",
    tech: ["C++17", "libpcap", "TLS/SNI", "Multithreading"],
    github: "https://github.com/Shashank17singh/DPI-Engine",
    demo: "https://github.com/Shashank17singh/DPI-Engine/blob/main/dpi-engine.png",
    demoLabel: "View Output",
    color: "from-blue-500/20 to-cyan-500/20",
    hoverColor: "group-hover:border-cyan-500/50"
  },
  {
    title: "Your Own AI - Vector Database",
    description: "C++ vector database with HNSW, KD-Tree, and brute-force search, plus an Ollama-backed local RAG pipeline, REST API, automated benchmarks, and 2D PCA visualization.",
    tech: ["C++", "HNSW", "KD-Tree", "RAG", "Ollama"],
    github: "https://github.com/Shashank17singh/Your-Own-AI",
    demo: "https://github.com/Shashank17singh/Your-Own-AI/blob/main/Your-Own-AI.png",
    demoLabel: "View Architecture",
    color: "from-indigo-500/20 to-purple-500/20",
    hoverColor: "group-hover:border-purple-500/50"
  },
  {
    title: "UPI Mesh - Offline-First Payments",
    description: "Offline-first FastAPI backend for UPI-style transactions, using hybrid RSA-2048/AES-256-GCM cryptography, a simulated Bluetooth mesh network, and ciphertext-hash idempotency.",
    tech: ["Python", "FastAPI", "RSA-2048", "AES-256-GCM"],
    github: "https://github.com/Shashank17singh/UPI-Mesh",
    demo: "https://upi-mesh.duckdns.org/",
    color: "from-rose-500/20 to-orange-500/20",
    hoverColor: "group-hover:border-orange-500/50"
  },
  {
    title: "Code Sentinel",
    description: "An evidence-based integrity triage system for coding assessments, powered by MOSS-style fingerprinting, a Groq LLM investigator, and Streamlit.",
    tech: ["Python", "Streamlit", "Groq LLM", "MOSS"],
    github: "https://github.com/Shashank17singh/Code-Sentinel",
    demo: "https://code-sentinel.streamlit.app/",
    demoLabel: "Live demo",
    color: "from-blue-500/20 to-purple-500/20",
    hoverColor: "group-hover:border-purple-500/50"
  },
  {
    title: "Restaurant Agent",
    description: "Stateful AI restaurant ordering system with LangGraph, Gemini, FastAPI, Pydantic tool calling, multi-turn memory, and a responsive Streamlit frontend.",
    tech: ["LangGraph", "Gemini", "FastAPI", "Pydantic", "Streamlit"],
    github: "https://github.com/Shashank17singh/Restaurant-Agent",
    demo: "https://restaurants-agents.streamlit.app/",
    color: "from-amber-500/20 to-orange-500/20",
    hoverColor: "group-hover:border-amber-500/50"
  },
  {
    title: "Customer Churn Prediction",
    description: "Interactive telecom churn predictor using an ANN classifier. Features per-customer explanations, batch scoring, and model diagnostics.",
    tech: ["Python", "scikit-learn", "ANN", "Streamlit"],
    github: "https://github.com/Shashank17singh/Customer-Churn-Prediction",
    demo: "https://customer-telecom-churn.streamlit.app/",
    demoLabel: "Live demo",
    color: "from-fuchsia-500/20 to-rose-500/20",
    hoverColor: "group-hover:border-rose-500/50"
  },
  {
    title: "Learning Analytics Engine",
    description: "Learning platform that generates assessments from uploaded PDFs using RAG and multi-provider LLMs, with predictive modeling for student metrics and Supabase-backed telemetry.",
    tech: ["RAG", "Gemini", "LangChain", "Scikit-learn", "Supabase"],
    github: "https://github.com/Shashank17singh/Learning-Analytics-Engine",
    demo: "https://learning-analytics-engine.streamlit.app/",
    color: "from-emerald-500/20 to-teal-500/20",
    hoverColor: "group-hover:border-emerald-500/50"
  },
  {
    title: "Agentic Fraud Sentinel",
    description: "Financial fraud detection system using an Optuna-tuned XGBoost model, temporal feature engineering, SMOTE balancing, and SHAP-based model explainability.",
    tech: ["Python", "XGBoost", "Optuna", "SMOTE", "SHAP"],
    github: "https://github.com/Shashank17singh/Agentic-Fraud-Sentinel",
    demo: "https://agentic-fraud-sentinel.streamlit.app/",
    color: "from-rose-500/20 to-red-500/20",
    hoverColor: "group-hover:border-rose-500/50"
  },
  {
    title: "YouTube Scrapper - Multi-Playlist RAG",
    description: "RAG system that analyzes YouTube playlists and returns grounded answers with video timestamps using BAAI/bge-m3 embeddings, Qdrant, and asynchronous Faster-Whisper transcription.",
    tech: ["RAG", "Qdrant", "Faster-Whisper", "Python"],
    github: "https://github.com/Shashank17singh/Youtube-Scrapper",
    demo: "https://youtubescrapper-mb60.onrender.com/",
    color: "from-violet-500/20 to-purple-500/20",
    hoverColor: "group-hover:border-violet-500/50"
  },
  {
    title: "Agentic JobHunt",
    description: "Automated job-search pipeline that uses public ATS APIs, deterministic filtering, and two-stage LLM screening to match resumes with roles and draft tailored application kits.",
    tech: ["Python", "LLMs", "ATS APIs", "Automation"],
    github: "https://github.com/Shashank17singh/JobHunt",
    demo: null,
    color: "from-sky-500/20 to-blue-500/20",
    hoverColor: "group-hover:border-sky-500/50"
  },
  {
    title: "Hire Me AI - Resume Parser & Chatbot",
    description: "FastAPI application that parses PDF resumes into Pydantic schemas and provides a Gemini-powered, fact-grounded recruiter chatbot.",
    tech: ["FastAPI", "Gemini", "Pydantic", "PDF"],
    github: "https://github.com/Shashank17singh/Hire-Me-AI",
    demo: "https://hiremeai-dn64.onrender.com/",
    color: "from-fuchsia-500/20 to-pink-500/20",
    hoverColor: "group-hover:border-fuchsia-500/50"
  },
  {
    title: "Conversational RAG Chatbot",
    description: "Production-ready RAG web application for multi-turn, context-aware conversations over uploaded PDF documents with LangChain, Gemini, and ChromaDB.",
    tech: ["Streamlit", "LangChain", "Gemini", "ChromaDB"],
    github: "https://github.com/Shashank17singh/Conversational-RAG-Chatbot",
    demo: "https://conversational-rag-chatbot-pdf.streamlit.app/",
    color: "from-cyan-500/20 to-blue-500/20",
    hoverColor: "group-hover:border-cyan-500/50"
  },
  {
    title: "AI Resume Screener",
    description: "Streamlit application for automated resume scoring with Pydantic schemas, batch processing, caching, retry handling, and Gemini-based skill-gap analysis.",
    tech: ["Streamlit", "Gemini", "Pydantic", "Python"],
    github: "https://github.com/Shashank17singh/AI-Resume-Screener",
    demo: "https://screen-resumes-ai.streamlit.app/",
    color: "from-indigo-500/20 to-blue-500/20",
    hoverColor: "group-hover:border-indigo-500/50"
  },
  {
    title: "Home Price Suite",
    description: "End-to-end machine learning application with a Flask REST API, Nginx reverse proxy, responsive frontend, and a feature-engineered linear regression model.",
    tech: ["Flask", "Nginx", "Scikit-learn", "Docker"],
    github: "https://github.com/Shashank17singh/Home-Prices-Suite",
    demo: "https://home-prices-api.duckdns.org/",
    color: "from-lime-500/20 to-emerald-500/20",
    hoverColor: "group-hover:border-lime-500/50"
  },
  {
    title: "SolarWind Forecaster",
    description: "Time-series forecasting project for renewable energy generation using rolling-window features, lag variables, and strict temporal train/test splitting.",
    tech: ["Python", "Scikit-learn", "Pandas", "Streamlit"],
    github: "https://github.com/Shashank17singh/SolarWind-Forecaster",
    demo: "https://solarwind-forecaster.streamlit.app/",
    color: "from-yellow-500/20 to-orange-500/20",
    hoverColor: "group-hover:border-yellow-500/50"
  },
  {
    title: "Sports Person Classifier",
    description: "Computer-vision classification system using OpenCV Haar Cascades and wavelet transforms, with optimized SVM, Random Forest, and Logistic Regression models.",
    tech: ["OpenCV", "Scikit-learn", "Flask", "Computer Vision"],
    github: "https://github.com/Shashank17singh/Sports-Person-Classifier",
    demo: "https://sports-person-classifier-xi.vercel.app/",
    color: "from-teal-500/20 to-cyan-500/20",
    hoverColor: "group-hover:border-teal-500/50"
  },
  {
    title: "Posture Checker - AI Physiotherapy",
    description: "AI-driven physiotherapy application that uses MediaPipe pose estimation to provide real-time exercise-form feedback, joint-angle analysis, repetition counting, and corrections.",
    tech: ["Python", "MediaPipe", "OpenCV", "Streamlit"],
    github: "https://github.com/Shashank17singh/SIC-Project",
    demo: "https://sic-project.streamlit.app/",
    color: "from-orange-500/20 to-red-500/20",
    hoverColor: "group-hover:border-orange-500/50"
  },
  {
    title: "House Price Predictor",
    description: "NIELIT capstone machine-learning pipeline that predicts Mumbai property prices using a Random Forest Regressor trained on 76,000+ records.",
    tech: ["Python", "Streamlit", "Random Forest", "Pandas"],
    github: "https://github.com/Shashank17singh/NIELIT-Project",
    demo: "https://nielit-project.streamlit.app/",
    color: "from-blue-500/20 to-indigo-500/20",
    hoverColor: "group-hover:border-blue-500/50"
  }];

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
        <h2 className="text-4xl font-bold tracking-tight">Featured <span className="text-cyan-400 font-mono italic">Projects</span></h2>
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
            <div className={`absolute inset-0 bg-gradient-to-br ${project.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}></div>
            <div className={`relative h-full bg-slate-900/80 border border-slate-700/50 backdrop-blur-sm rounded-2xl p-8 flex flex-col transition-all duration-500 ${project.hoverColor} group-hover:-translate-y-2`}>
              
              <div className="mb-6">
                <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                  <FolderGit2 className="w-8 h-8 text-cyan-400" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">{project.title}</h3>
              <p className="text-slate-400 leading-relaxed mb-8 flex-grow">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map(t => (
                  <span key={t} className="text-xs font-mono text-slate-300 bg-slate-800/50 px-2 py-1 rounded border border-slate-700">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex gap-4 text-sm font-medium">
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-slate-300 hover:text-white">GitHub <GitBranch className="h-4 w-4" /></a>
                {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300">{project.demoLabel ?? "Live demo"} <ExternalLink className="h-4 w-4" /></a>}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

