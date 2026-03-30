"use client";
import { useEffect, useRef, useState } from "react";

const phrases = [
  "Every telemetry packet is signed.",
  "Tampering is detected instantly.",
  "Foritech proves what is real.",
];

export default function TypingTagline() {
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const phraseIndex = useRef(0);
  const charIndex = useRef(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    function tick() {
      const phrase = phrases[phraseIndex.current];
      if (!deleting) {
        charIndex.current++;
        setDisplayed(phrase.slice(0, charIndex.current));
        if (charIndex.current === phrase.length) {
          setDeleting(true);
          timeout = setTimeout(tick, 2000);
          return;
        }
        timeout = setTimeout(tick, 60);
      } else {
        charIndex.current--;
        setDisplayed(phrase.slice(0, charIndex.current));
        if (charIndex.current === 0) {
          setDeleting(false);
          phraseIndex.current = (phraseIndex.current + 1) % phrases.length;
          timeout = setTimeout(tick, 300);
          return;
        }
        timeout = setTimeout(tick, 30);
      }
    }
    timeout = setTimeout(tick, 600);
    return () => clearTimeout(timeout);
  }, [deleting]);

  return (
    <>
      <style>{`
        .tt-line { font-size: clamp(1rem, 2vw, 1.4rem); font-weight: 700; color: #e8eaed; min-height: 2rem; font-family: monospace; }
        .tt-cursor { display: inline-block; width: 2px; height: 1em; background: #22c55e; margin-left: 2px; vertical-align: middle; animation: ttblink 1s step-end infinite; }
        @keyframes ttblink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
      <div className="tt-line">
        {displayed}<span className="tt-cursor" />
      </div>
    </>
  );
}
