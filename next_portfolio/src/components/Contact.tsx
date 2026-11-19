const EMAIL = "mailto:shashanksingh1709@gmail.com";
const PHONE = "+91 79058 51722";
const PHONE_TEL = "tel:+917905851722";

const socialLinks = [
  ["Email", EMAIL],
  ["Phone", PHONE_TEL],
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
            <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>{label}</a>
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
        <div style={{ display: "grid", gap: "var(--space-md)", alignContent: "start" }}>
          <h2>Get in touch</h2>
          <p>
            I am looking for software engineering and data science roles, research collaborations and AI and ML
            projects.
          </p>
          <div style={{ display: "grid", gap: "var(--space-xs)" }}>
            <a className="close__mail" href={EMAIL}>shashanksingh1709@gmail.com</a>
            <a className="close__phone" href={PHONE_TEL} style={{ fontSize: "var(--text-lg)", color: "var(--color-ink-2)", textDecoration: "none" }}>{PHONE}</a>
          </div>
        </div>
        <div className="profiles">
          <LinkGroup title="Elsewhere" links={socialLinks} />
          <LinkGroup title="Coding profiles" links={codingLinks} />
        </div>
      </div>
    </section>
  );
}
