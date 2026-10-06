"use client";

import { useEffect, useState } from "react";

const phrases = [
  "Building Low-Level Systems",
  "Crafting RAG Pipelines",
  "Designing Vector Search Engines",
  "Shipping AI Agents",
  "Exploring Cryptographic Protocols",
];

export function TypingHeadline() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[phraseIndex];
    const atEnd = length >= phrase.length;
    const atStart = length === 0;
    const delay = atEnd ? 1400 : deleting ? 35 : 70;

    const timer = window.setTimeout(() => {
      if (!deleting && atEnd) setDeleting(true);
      else if (deleting && atStart) {
        setDeleting(false);
        setPhraseIndex((index) => (index + 1) % phrases.length);
      } else {
        setLength((value) => value + (deleting ? -1 : 1));
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [deleting, length, phraseIndex]);

  return (
    <p
      className="min-h-8 max-w-full text-xl text-slate-400 md:text-2xl"
      aria-label={phrases[phraseIndex]}
    >
      <span className="break-words text-blue-500 font-mono">
        {phrases[phraseIndex].slice(0, length)}
      </span>
      <span
        className="ml-1 inline-block h-6 w-0.5 align-[-0.1em] bg-blue-500 animate-pulse"
        aria-hidden="true"
      />
    </p>
  );
}
