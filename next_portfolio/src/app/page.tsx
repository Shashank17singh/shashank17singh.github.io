import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { TypingHeadline } from "@/components/TypingHeadline";
import { Contact } from "@/components/Contact";
import { Chatbot } from "@/components/Chatbot";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-50 selection:bg-blue-500/30">
      <section
        id="hero"
        className="relative flex flex-col md:flex-row items-center justify-between min-h-screen pt-24 px-16 max-w-7xl mx-auto w-full gap-10"
      >
        {/* Left Side */}
        <div className="flex-1 flex flex-col items-start z-10">
          <div className="flex items-center gap-2 bg-blue-500/15 border border-blue-500/25 rounded-full px-4 py-1.5 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_rgba(96,165,250,0.8)]"></span>
            <span className="text-blue-400 text-sm font-medium">
              Open to software engineering and data science opportunities
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 fill-mode-both">
            Hi, I&apos;m <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-indigo-600">
              Shashank
            </span>
          </h1>

          <div className="mb-8 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200 fill-mode-both">
            <TypingHeadline />
          </div>

          <p className="text-slate-400 text-lg leading-relaxed max-w-md mb-10 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300 fill-mode-both">
            Final-year Computer Science candidate specializing in{" "}
            <strong className="text-slate-100">high-performance systems, applied AI, and scalable backend infrastructure</strong>.
          </p>

          <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-500 fill-mode-both">
            <a
              href="#projects"
              className="bg-gradient-to-br from-slate-800 to-slate-900 text-white px-8 py-3 rounded-full font-bold shadow-[0_4px_24px_rgba(99,102,241,0.2)] hover:shadow-[0_10px_36px_rgba(99,102,241,0.4)] transition-all border border-slate-700"
            >
              View Work
            </a>
            <div className="border border-slate-700 bg-slate-800/50 rounded-full flex items-center justify-center hover:border-blue-500 transition-colors group">
              <a
                href="https://mail.google.com/mail/u/0/?fs=1&to=shashanksingh1709@gmail.com&tf=cm"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 font-medium text-slate-200 group-hover:text-blue-400 transition-colors"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1 flex justify-end relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both w-full max-w-md">
          <div className="bg-slate-900/60 border border-slate-700/80 rounded-2xl p-8 shadow-2xl backdrop-blur-md w-full relative overflow-hidden group hover:border-indigo-500/50 transition-colors duration-500">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-3xl font-bold mb-6 shadow-lg shadow-indigo-500/20">
              SS
            </div>

            <h3 className="text-2xl font-bold text-slate-100 mb-1">
              Shashank Singh
            </h3>
            <p className="text-sm text-slate-400 mb-6">
              B.Tech CSE (Artificial Intelligence)
            </p>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-slate-100 mb-1 text-shadow-sm shadow-blue-500/20">
                  6<span className="text-blue-400 text-sm">+</span>
                </div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500">
                  Top Projects
                </div>
              </div>
              <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-slate-100 mb-1">3</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500">
                  Credentials
                </div>
              </div>
              <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-slate-100 mb-1">AI</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500">
                  Specialization
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {["C++17", "Python", "FastAPI", "LangGraph", "Docker", "AWS"].map(
                (skill) => (
                  <span
                    key={skill}
                    className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {skill}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />

      <footer className="border-t border-slate-800 bg-slate-950/50 backdrop-blur-lg mt-24">
        <div className="max-w-7xl mx-auto px-16 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-xs font-bold shadow-lg shadow-indigo-500/20">
              SS
            </div>
            <span className="text-slate-300 font-medium">Shashank Singh</span>
          </div>
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Shashank Singh. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="https://github.com/shashank17singh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors text-sm"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/shashank17singh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors text-sm"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
      <Chatbot />
    </div>
  );
}
