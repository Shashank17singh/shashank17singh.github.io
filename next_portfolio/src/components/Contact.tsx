const EMAIL = "https://mail.google.com/mail/u/0/?fs=1&to=shashanksingh1709@gmail.com&tf=cm";

const socialLinks = [
  ["Email", EMAIL],
  ["LinkedIn", "https://www.linkedin.com/in/shashank17singh/"],
  ["GitHub", "https://github.com/Shashank17singh"],
  ["Codolio", "https://codolio.com/profile/Shashank17singh"],
  ["X", "https://x.com/Shashank_017"],
  ["WhatsApp", "https://wa.me/917905851722"],
  ["Telegram", "https://t.me/Shashank17singh"],
  ["YouTube", "https://youtube.com/@Shashank17Singh"],
  ["Instagram", "https://instagram.com/shashank.17singh"],
  ["Facebook", "https://www.facebook.com/shashank17singh"],
  ["Discord", "https://discord.gg/F82y2p7sp"],
  ["Reddit", "https://reddit.com/user/u/Ok-Jelly-6146"],
  ["Quora", "https://quora.com/profile/Shashank-Singh-1352"],
  ["Pinterest", "https://pinterest.com/shashank17singh"],
];

const codingLinks = [
  ["LeetCode", "https://leetcode.com/u/Shashank17singh/"],
  ["Codeforces", "https://codeforces.com/profile/shashank17singh"],
  ["CodeChef", "https://www.codechef.com/users/Shashank7Singh"],
  ["GeeksforGeeks", "https://www.geeksforgeeks.org/user/Shashank17Singh"],
  ["HackerRank", "https://www.hackerrank.com/profile/shashanksingh172"],
  ["InterviewBit", "https://www.interviewbit.com/profile/shashank-singh_401"],
  ["CodeStudio", "https://www.naukri.com/code360/profile/66d93f30-c8d5-4bf2-b875-84ca0e8ac742"],
  ["AtCoder", "https://atcoder.jp/users/shashank17singh"],
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
          <LinkGroup title="Social and professional" links={socialLinks} />
          <LinkGroup title="Coding profiles" links={codingLinks} />
        </div>
      </div>
    </section>
  );
}
