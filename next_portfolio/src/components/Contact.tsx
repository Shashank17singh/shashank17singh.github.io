const socialLinks = [
  [
    "Email",
    "https://mail.google.com/mail/u/0/?fs=1&to=shashanksingh1709@gmail.com&tf=cm",
  ],
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
  [
    "CodeStudio",
    "https://www.naukri.com/code360/profile/66d93f30-c8d5-4bf2-b875-84ca0e8ac742",
  ],
  ["AtCoder", "https://atcoder.jp/users/shashank17singh"],
];

function LinkGroup({ title, links }: { title: string; links: string[][] }) {
  return (
    <div className="mt-9">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        {title}
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {links.map(([label, href]) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-blue-500 hover:text-blue-300"
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}

export function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto w-full max-w-7xl px-6 py-24 md:px-16"
    >
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 text-center md:p-12">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-blue-400">
          Contact
        </p>
        <h2 className="text-4xl font-bold tracking-tight text-white">
          Get in touch
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-slate-400">
          I am actively pursuing software engineering and data science
          opportunities, research collaborations, and impactful AI/ML projects.
        </p>
        <LinkGroup title="Social & Professional" links={socialLinks} />
        <LinkGroup title="Coding Profiles" links={codingLinks} />
      </div>
    </section>
  );
}
