import { motion } from "framer-motion";
import { ExternalLink, GitBranch, FolderGit2 } from "lucide-react";

const projects = [
  {
    title: "AI Virtual Mouse",
    description: "A computer vision application that controls the mouse pointer and executes clicks using hand gestures. Built using MediaPipe and OpenCV.",
    tech: ["Python", "OpenCV", "MediaPipe", "PyAutoGUI"],
    github: "https://github.com/shashank17singh/Virtual-Mouse",
    demo: null,
    color: "from-blue-500/20 to-cyan-500/20",
    hoverColor: "group-hover:border-cyan-500/50"
  },
  {
    title: "Real-Time Chat App",
    description: "A highly scalable MERN stack chat application featuring real-time messaging, user authentication, online status indicators, and responsive UI.",
    tech: ["MongoDB", "Express", "React", "Node.js", "Socket.io"],
    github: "https://github.com/shashank17singh/chat-app",
    demo: "https://chat-app-d352.onrender.com",
    color: "from-indigo-500/20 to-purple-500/20",
    hoverColor: "group-hover:border-purple-500/50"
  },
  {
    title: "Gemini Vision Explorer",
    description: "An advanced multi-modal AI interface leveraging Gemini Pro Vision for complex image analysis, OCR, and context-aware visual Q&A.",
    tech: ["Next.js", "Gemini API", "TailwindCSS", "TypeScript"],
    github: "https://github.com/shashank17singh",
    demo: null,
    color: "from-rose-500/20 to-orange-500/20",
    hoverColor: "group-hover:border-orange-500/50"
  }
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
              
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                  <FolderGit2 className="w-8 h-8 text-cyan-400" />
                </div>
                <div className="flex gap-3">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                      <GitBranch className="w-5 h-5" />
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
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
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
