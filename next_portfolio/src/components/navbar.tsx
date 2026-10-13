"use client";

import { useState } from "react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#131314]/70 backdrop-blur-xl border-b border-transparent transition-all duration-300">
      <div className="flex justify-between items-center px-4 sm:px-8 md:px-16 py-5">
        <div className="text-lg font-bold tracking-tight text-slate-50">
          Shashank Singh<span className="text-blue-500">.</span>
        </div>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-4 list-none m-0 p-0 items-center">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-slate-400 text-sm font-medium py-2 px-4 rounded-full transition-colors hover:text-slate-50 hover:bg-slate-800"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger button */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg transition-colors hover:bg-slate-800"
          aria-label="Toggle navigation menu"
        >
          <span
            className={`block w-5 h-0.5 bg-slate-300 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-0.75" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-slate-300 mt-1 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-0.75" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-64 border-t border-slate-800" : "max-h-0"}`}
      >
        <ul className="flex flex-col gap-1 px-4 py-3 list-none m-0">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block text-slate-400 text-sm font-medium py-3 px-4 rounded-lg transition-colors hover:text-slate-50 hover:bg-slate-800"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
