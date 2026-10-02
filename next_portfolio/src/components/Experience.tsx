"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    role: "Python & Data Science Trainee",
    company: "NIELIT, Gorakhpur (Government of India) · Remote",
    duration: "Jun 2025 – Jul 2025",
    description: "Completed a 60-hour structured training in Python, NumPy, Pandas, Matplotlib, and introductory machine learning. Built a House Price Predictor capstone using Random Forest and Streamlit on 76,000+ real-world property records.",
    tech: ["Python", "NumPy", "Pandas", "Scikit-learn", "Streamlit"]
  }
];

export function Experience() {
  return (
    <section id="experience" className="py-32 px-16 max-w-4xl mx-auto w-full relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="flex items-center gap-4 mb-16"
      >
        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
        <h2 className="text-4xl font-bold tracking-tight">Work <span className="text-emerald-400 font-mono italic">Experience</span></h2>
      </motion.div>

      <div className="relative border-l border-slate-700/50 ml-3 md:ml-4 space-y-12">
        {experiences.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 }}
            className="relative pl-8 md:pl-12"
          >
            <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
            
            <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2 gap-2">
              <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
              <span className="text-emerald-400 font-mono text-sm">{exp.duration}</span>
            </div>
            
            <p className="text-slate-400 font-medium mb-4">{exp.company}</p>
            <p className="text-slate-300 leading-relaxed mb-6">{exp.description}</p>
            
            <div className="flex flex-wrap gap-2">
              {exp.tech.map(t => (
                <span key={t} className="px-3 py-1 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 rounded-full text-xs font-medium">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
