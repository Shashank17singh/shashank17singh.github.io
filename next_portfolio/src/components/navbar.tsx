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

const EMAIL = "mailto:shashanksingh1709@gmail.com";
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
            <a href={EMAIL} aria-label="Send email to shashanksingh1709@gmail.com">Email me</a>
          </div>
        </div>
      </div>
      <nav className="bar" aria-label="Main">
        <div className="container bar__row">
          <a href="/#hero" className="wordmark" aria-label="Shashank Singh, back to the top">Shashank Singh</a>

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
              <a href={EMAIL} onClick={() => setMenuOpen(false)} className="navlink">Email: shashanksingh1709@gmail.com</a>
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
