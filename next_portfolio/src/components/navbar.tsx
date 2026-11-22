"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";

// The theme lives on <html data-theme>; CSS picks the icon, so the server render never mismatches.
function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const dark = root.dataset.theme
      ? root.dataset.theme === "dark"
      : matchMedia("(prefers-color-scheme: dark)").matches;
    const next = dark ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch {}
  }

  return (
    <button type="button" onClick={toggle} className="theme-toggle" aria-label="Toggle dark mode">
      <Moon size={18} aria-hidden="true" className="theme-toggle__moon" />
      <Sun size={18} aria-hidden="true" className="theme-toggle__sun" />
    </button>
  );
}

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const EMAIL = "https://mail.google.com/mail/?view=cm&fs=1&to=shashanksingh1709@gmail.com";
const PHONE_TEL = "tel:+917905851722";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <div className="notice">
        <div className="container">
          <p>Open to software engineering and data science roles.</p>
          <div style={{ display: "flex", gap: "var(--space-md)", alignItems: "center" }}>
            <a href={PHONE_TEL} aria-label="Call +91 79058 51722">+91 79058 51722</a>
            <span aria-hidden="true" style={{ color: "var(--color-rule)" }}>•</span>
            <a href={EMAIL} target="_blank" rel="noopener noreferrer" aria-label="Send email to shashanksingh1709@gmail.com">Email me</a>
          </div>
        </div>
      </div>
      <nav className="bar" aria-label="Main">
        <div className="container bar__row">
          <a href="/#hero" className="wordmark" aria-label="Shashank Singh, back to the top">
            <span className="wordmark__badge" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="7" fill="#0d0f12"/>
                <path d="M8.535266974291364 19.200065919578115 12.142386288727751 18.849373764007908Q12.468029004614369 20.665458141067894 13.463744232036914 21.51713909030982Q14.45945945945946 22.368820039551746 16.150296638101516 22.368820039551746Q17.941331575477918 22.368820039551746 18.84937376400791 21.61107448912327Q19.757415952537905 20.85332893869479 19.757415952537905 19.83882663150956Q19.757415952537905 19.18754119973632 19.375411997363216 18.730388925510873Q18.99340804218853 18.27323665128543 18.04152933421226 17.93506921555702Q17.390243902439025 17.709624258404745 15.073170731707316 17.133487145682267Q12.09228740936058 16.39452867501648 10.889914304548451 15.31740276862228Q9.199077125906394 13.801911667765326 9.199077125906394 11.622610415293341Q9.199077125906394 10.219841793012524 9.99439683586025 8.998681608437705Q10.789716545814105 7.777521423862886 12.28642056690837 7.138760711931443Q13.783124588002636 6.5 15.899802241265654 6.5Q19.356624917600527 6.5 21.103823335530652 8.015491100856954Q22.851021753460778 9.530982201713908 22.938694792353328 12.060975609756097L19.231377719182596 12.223796967699405Q18.99340804218853 10.808503625576796 18.210613052076468 10.188529993408041Q17.427818061964402 9.568556361239287 15.862228081740277 9.568556361239287Q14.246539222148979 9.568556361239287 13.332234673698089 10.232366512854316Q12.743572841133815 10.65820698747528 12.743572841133815 11.372116018457481Q12.743572841133815 12.023401450230718 13.294660514172708 12.48681608437706Q13.996044825313117 13.075477916941331 16.70138431114041 13.714238628872774Q19.4067237969677 14.352999340804217 20.70303230059328 15.035596572181937Q21.999340804218853 15.718193803559656 22.732036914963743 16.901779828609097Q23.464733025708636 18.085365853658537 23.464733025708636 19.826301911667763Q23.464733025708636 21.404416611733684 22.588002636783123 22.782135794330912Q21.711272247857615 24.159854976928145 20.10810810810811 24.829927488464072Q18.504943968358603 25.5 16.112722478576135 25.5Q12.630850362557679 25.5 10.76466710613052 23.890573500329598Q8.89848384970336 22.281147000659196 8.535266974291364 19.200065919578115Z" fill="#f4f5f6"/>
              </svg>
            </span>
            <span>Shashank Singh</span>
          </a>

          <div className="bar__end">
          <ul className="bar__links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="navlink">{link.label}</a>
              </li>
            ))}
          </ul>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="menu-toggle"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
          </div>
        </div>

        <div id="mobile-menu" className="menu" hidden={!menuOpen}>
          <ul className="container">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setMenuOpen(false)} className="navlink">{link.label}</a>
              </li>
            ))}
            <li style={{ borderTop: "var(--rule-hair) solid var(--color-rule)", marginTop: "var(--space-2xs)", paddingTop: "var(--space-2xs)" }}>
              <a href={EMAIL} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} className="navlink">Email: shashanksingh1709@gmail.com</a>
            </li>
            <li>
              <a href={PHONE_TEL} onClick={() => setMenuOpen(false)} className="navlink">Phone: +91 79058 51722</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
