"use client";

import { useState } from "react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
];

const EMAIL = "https://mail.google.com/mail/u/0/?fs=1&to=shashanksingh1709@gmail.com&tf=cm";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <div className="notice">
        <div className="container">
          <p>Open to software engineering and data science roles.</p>
          <a href={EMAIL} target="_blank" rel="noopener noreferrer">Email me</a>
        </div>
      </div>
      <nav className="bar" aria-label="Main">
        <div className="container bar__row">
          <a href="#hero" className="wordmark" aria-label="Shashank Singh, back to the top">Shashank Singh</a>

          <ul className="bar__links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="navlink">{link.label}</a>
              </li>
            ))}
          </ul>

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

        <div id="mobile-menu" className="menu" hidden={!menuOpen}>
          <ul className="container">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setMenuOpen(false)} className="navlink">{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
