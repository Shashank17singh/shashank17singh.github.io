const experiences = [
  {
    role: "Python and data science trainee",
    company: "NIELIT, Gorakhpur (Government of India), remote",
    duration: "Jun 2025 to Jul 2025",
    points: [
      "Completed a government-certified programme in Python, Pandas, NumPy, Matplotlib, SQLite and machine learning.",
      "Built a house price predictor with Random Forest and Linear Regression, trained on 76,000+ property records.",
      "Served predictions through a Streamlit app and a Tkinter desktop GUI, logging queries to SQLite.",
    ],
    tech: ["Python", "Scikit-learn", "Streamlit", "Tkinter", "SQLite"],
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
