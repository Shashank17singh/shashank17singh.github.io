const experiences = [
  {
    role: "AI trainer: coding, generalist and STEM",
    company: "Handshake AI, AfterQuery, Outlier, Ethara AI, remote",
    duration: "Apr 2026 to present",
    points: [
      "Handshake AI (Jul 2026 to present): wrote RLHF coding prompts, reference solutions and tests in Python and C++, and multi-turn engineering prompts that need visual reasoning from technical diagrams.",
      "AfterQuery (Nov 2026): wrote image-grounded STEM problems with worked derivations and ground truth.",
      "Outlier (Aug to Sep 2026): compared paired AI-generated audio answers to a prompt on multiple quality criteria.",
      "Ethara AI (Apr to May 2026): compared paired AI-generated images for a prompt on multiple quality criteria.",
    ],
    tech: ["Python", "C++", "RLHF", "LLM evaluation"],
  },
];

const certificates = [
  { name: "Samsung Innovation Campus", what: "Artificial Intelligence certificate", href: "https://github.com/Shashank17singh/SIC-Project/blob/master/SIC%20Certificate.pdf" },
  { name: "NIELIT, Gorakhpur", what: "Industrial training in data science and ML", href: "https://github.com/Shashank17singh/NIELIT-Project/blob/main/NIELIT%20Certificate.pdf" },
  { name: "AWS Academy", what: "Fundamentals of ML and AI", href: "https://drive.google.com/file/d/1BIk7_Sc7RUaW5huU4AEgFMzN3jCe4OmH/view?usp=sharing" },
];

export function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <div className="head">
          <h2>Experience and training</h2>
        </div>
        <div className="two-col">
          <div>
            {experiences.map((exp) => (
              <article key={exp.role}>
                <h3 className="block-title">{exp.role}</h3>
                <p className="muted">{exp.company}</p>
                <p className="when">{exp.duration}</p>
                <ul className="points">
                  {exp.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
                <p className="small muted" style={{ marginTop: "var(--space-md)" }}>{exp.tech.join(", ")}</p>
              </article>
            ))}
          </div>
          <div>
            <h3 className="block-title">Certificates</h3>
            <ul className="ruled">
              {certificates.map((cert) => (
                <li key={cert.name} style={{ paddingBlock: "var(--space-md)" }}>
                  <a href={cert.href} target="_blank" rel="noopener noreferrer">{cert.name}</a>
                  <p className="small muted">{cert.what}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
