"use client";
import { useEffect, useRef, useState } from "react";

const bars = [
  { label: "Signature integrity", val: 100, color: "#22c55e" },
  { label: "Replay protection",   val: 98,  color: "#22c55e" },
  { label: "Algorithm policy",    val: 100, color: "#22c55e" },
  { label: "Device uptime",       val: 75,  color: "#f59e0b" },
];
const TOTAL = 93;
const CIRCUMFERENCE = 226;

export default function SecurityScore() {
  const [progress, setProgress] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const start = Date.now();
    const dur = 1800;
    function step() {
      const p = Math.min((Date.now() - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setProgress(ease);
      if (p < 1) requestAnimationFrame(step);
    }
    setTimeout(() => requestAnimationFrame(step), 400);
  }, []);

  const offset = CIRCUMFERENCE - CIRCUMFERENCE * (progress * TOTAL / 100);

  return (
    <>
      <style>{`
        .ss-wrap { display: flex; align-items: center; gap: 2rem; padding: 1.5rem 2rem; background: #111317; border: 0.5px solid rgba(255,255,255,0.08); border-radius: 12px; flex-wrap: wrap; }
        .ss-ring { position: relative; width: 88px; height: 88px; flex-shrink: 0; }
        .ss-ring svg { transform: rotate(-90deg); }
        .ss-ring-inner { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .ss-big { font-size: 20px; font-weight: 700; color: #22c55e; line-height: 1; }
        .ss-small { font-size: 8px; color: #6b7280; letter-spacing: 0.05em; margin-top: 1px; }
        .ss-details { flex: 1; display: flex; flex-direction: column; gap: 8px; min-width: 200px; }
        .ss-bar-row { display: flex; align-items: center; gap: 8px; font-size: 11px; }
        .ss-bar-label { color: #9ca3af; width: 140px; flex-shrink: 0; font-family: sans-serif; }
        .ss-bar-track { flex: 1; height: 3px; background: rgba(255,255,255,0.06); border-radius: 2px; overflow: hidden; }
        .ss-bar-fill { height: 100%; border-radius: 2px; transition: width 1.5s cubic-bezier(0.22,1,0.36,1); }
        .ss-footer { font-size: 10px; color: #374151; margin-top: 4px; letter-spacing: 0.05em; font-family: monospace; }
      `}</style>
      <div className="ss-wrap">
        <div className="ss-ring">
          <svg width="88" height="88" viewBox="0 0 88 88">
            <circle cx="44" cy="44" r="36" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
            <circle cx="44" cy="44" r="36" fill="none" stroke="#22c55e" strokeWidth="6"
              strokeLinecap="round" strokeDasharray={CIRCUMFERENCE} strokeDashoffset={offset} />
          </svg>
          <div className="ss-ring-inner">
            <div className="ss-big">{Math.round(progress * TOTAL)}</div>
            <div className="ss-small">/ 100</div>
          </div>
        </div>
        <div className="ss-details">
          {bars.map((b) => (
            <div key={b.label} className="ss-bar-row">
              <span className="ss-bar-label">{b.label}</span>
              <div className="ss-bar-track">
                <div className="ss-bar-fill" style={{ width: `${progress * b.val}%`, background: b.color }} />
              </div>
              <span style={{ fontSize: 10, color: b.color }}>{b.val}%</span>
            </div>
          ))}
          <div className="ss-footer">Foritech Secure System · ML-DSA-65 · v0.8-dev</div>
        </div>
      </div>
    </>
  );
}
