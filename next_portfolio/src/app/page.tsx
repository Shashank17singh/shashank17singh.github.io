import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Chatbot } from "@/components/Chatbot";

const EMAIL = "https://mail.google.com/mail/u/0/?fs=1&to=shashanksingh1709@gmail.com&tf=cm";

export default function Home() {
  return (
    <>
      <main id="main">
        <section id="hero" className="hero">
          <div className="container hero__grid">
            <div className="hero__text">
              <h1>Shashank Singh</h1>
              <p className="lead">I build C++ engines, Python backends and applied AI tools.</p>
              <div className="actions">
                <a href="#projects" className="btn btn--primary">View work</a>
                <a href={EMAIL} target="_blank" rel="noopener noreferrer" className="btn">Contact me</a>
              </div>
            </div>
            <figure className="shot">
              <div className="shot__frame" data-slot="hero" data-kind="product" data-alt="Hotseat's live home page, the mock interview he built">
                <img
                  src="/work/hotseat.png"
                  width={2880}
                  height={1800}
                  alt="Hotseat's home page, a spoken mock interview built from your resume"
                  fetchPriority="high"
                />
              </div>
              <figcaption className="caption">Hotseat, live on Vercel: a spoken mock interview built from your resume.</figcaption>
            </figure>
          </div>
        </section>

        <Projects />
        <About />
        <Skills />
        <Experience />
        <Contact />
      </main>

      <footer className="colophon">
        <div className="container">
          <p suppressHydrationWarning>
            © {new Date().getFullYear()} Shashank Singh, University of Lucknow. Set in Epilogue.
          </p>
          <ul>
            <li><a href="https://github.com/shashank17singh" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a href="https://linkedin.com/in/shashank17singh" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          </ul>
        </div>
      </footer>
      <Chatbot />
    </>
  );
}
