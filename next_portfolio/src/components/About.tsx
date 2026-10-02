"use client";

import { motion } from "framer-motion";
import { GraduationCap, Brain, Server } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-32 px-16 max-w-7xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="flex items-center gap-4 mb-16"
      >
        <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
        <h2 className="text-4xl font-bold tracking-tight">Professional <span className="text-blue-400 font-mono italic">Summary</span></h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex gap-4"
          >
            <GraduationCap className="w-8 h-8 text-blue-400 shrink-0 mt-1" />
            <p className="text-slate-300 text-lg leading-relaxed">
              I am a final-year <strong className="text-white">B.Tech Computer Science (Artificial Intelligence)</strong> candidate at the University of Lucknow, specializing in high-performance systems engineering, applied cryptography, and systems programming.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex gap-4"
          >
            <Server className="w-8 h-8 text-indigo-400 shrink-0 mt-1" />
            <p className="text-slate-300 text-lg leading-relaxed">
              My technical expertise centers on backend infrastructure, vector databases, and deploying machine learning models as web APIs utilizing <strong className="text-white">FastAPI, Docker, and AWS</strong>. 
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex gap-4"
          >
            <Brain className="w-8 h-8 text-purple-400 shrink-0 mt-1" />
            <p className="text-slate-300 text-lg leading-relaxed">
              I&apos;ve worked hands-on with systems ranging from packet inspection engines in modern C++ to RAG pipelines leveraging <strong className="text-white">Ollama, Gemini, LangChain, and ChromaDB</strong>.
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-indigo-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          <div className="relative bg-slate-900/80 border border-slate-700/50 backdrop-blur-sm rounded-2xl p-8 h-full flex flex-col justify-center gap-6 hover:border-indigo-500/50 transition-colors duration-500">
            <h3 className="text-2xl font-semibold text-white">Certifications & Training</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 transition-colors">
                <p className="font-semibold text-white mb-1">Samsung Innovation Campus</p>
                <p className="text-sm text-blue-400">Artificial Intelligence Certificate</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 transition-colors">
                <p className="font-semibold text-white mb-1">NIELIT, Gorakhpur</p>
                <p className="text-sm text-indigo-400">Industrial Training in Data Science & ML</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 transition-colors">
                <p className="font-semibold text-white mb-1">AWS Academy</p>
                <p className="text-sm text-orange-400">Cloud Foundations</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
