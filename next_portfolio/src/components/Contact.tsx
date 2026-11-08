const EMAIL = "https://mail.google.com/mail/u/0/?fs=1&to=shashanksingh1709@gmail.com&tf=cm";

const socialLinks = [
  ["Email", EMAIL],
  ["LinkedIn", "https://www.linkedin.com/in/shashank17singh/"],
  ["GitHub", "https://github.com/Shashank17singh"],
];

// Recruiters check two or three of these; the rest are on Codolio.
const codingLinks = [
  ["LeetCode", "https://leetcode.com/u/Shashank17singh/"],
  ["Codeforces", "https://codeforces.com/profile/shashank17singh"],
  ["Codolio", "https://codolio.com/profile/Shashank17singh"],
];

function LinkGroup({ title, links }: { title: string; links: string[][] }) {
  return (
    <div>
      <h3>{title}</h3>
      <ul>
        {links.map(([label, href]) => (
          <li key={label}>
            <a href={href} target="_blank" rel="noopener noreferrer">{label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Contact() {
  return (
    <section id="contact" className="section close">
      <div className="container close__grid">
        <div style={{ display: "grid", gap: "var(--space-lg)", alignContent: "start" }}>
          <h2>Get in touch</h2>
          <p>
            I am looking for software engineering and data science roles, research collaborations and AI and ML
            projects.
          </p>
          <a className="close__mail" href={EMAIL} target="_blank" rel="noopener noreferrer">shashanksingh1709@gmail.com</a>
        </div>
        <div className="profiles">
          <LinkGroup title="Elsewhere" links={socialLinks} />
          <LinkGroup title="Coding profiles" links={codingLinks} />
        </div>
      </div>
    </section>
  );
}
