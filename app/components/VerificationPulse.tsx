"use client";
export default function VerificationPulse() {
  return (
    <>
      <style>{`
        .vp-wrap { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 0; row-gap: 1rem; padding: 2rem 1rem; background: #111317; border: 0.5px solid rgba(255,255,255,0.08); border-radius: 12px; }
        .vp-node { background: #181b20; border: 0.5px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 10px 14px; text-align: center; min-width: 80px; }
        .vp-node-title { font-size: 12px; color: #e8eaed; font-weight: 500; margin-bottom: 2px; }
        .vp-node-sub { font-size: 9px; color: #4b5563; }
        .vp-arrow { display: flex; flex-direction: column; align-items: center; gap: 3px; padding: 0 6px; }
        .vp-line { width: 48px; height: 1px; background: rgba(34,197,94,0.2); position: relative; overflow: hidden; }
        .vp-dot { position: absolute; top: -2px; width: 6px; height: 6px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 6px #22c55e; animation: vpslide 1.4s linear infinite; }
        .vp-dot2 { animation-delay: 0.35s; }
        .vp-dot3 { animation-delay: 0.7s; }
        @keyframes vpslide { from{left:-6px} to{left:100%} }
        .vp-arrow-label { font-size: 8px; color: #374151; letter-spacing: 0.05em; }
        .vp-result { background: rgba(34,197,94,0.08); border: 1px solid rgba(34,197,94,0.5); border-radius: 8px; padding: 10px 14px; font-size: 13px; color: #22c55e; font-weight: 700; text-align: center; min-width: 80px; animation: vppulse 2s ease-in-out infinite; }
        @keyframes vppulse { 0%,100%{border-color:rgba(34,197,94,0.4);box-shadow:none} 50%{border-color:#22c55e;box-shadow:0 0 12px rgba(34,197,94,0.25)} }
      `}</style>
      <div className="vp-wrap">
        <div className="vp-node">
          <div className="vp-node-title">Device</div>
          <div className="vp-node-sub">any IoT / PLC</div>
        </div>
        <div className="vp-arrow">
          <div className="vp-line"><div className="vp-dot" /></div>
          <div className="vp-arrow-label">signs data</div>
        </div>
        <div className="vp-node" style={{ borderColor: "rgba(34,197,94,0.3)" }}>
          <div className="vp-node-title" style={{ color: "#22c55e" }}>Foritech</div>
          <div className="vp-node-sub">edge agent</div>
        </div>
        <div className="vp-arrow">
          <div className="vp-line"><div className="vp-dot vp-dot2" /></div>
          <div className="vp-arrow-label">ML-DSA-65</div>
        </div>
        <div className="vp-node">
          <div className="vp-node-title">Verify API</div>
          <div className="vp-node-sub">foritech.bg</div>
        </div>
        <div className="vp-arrow">
          <div className="vp-line"><div className="vp-dot vp-dot3" /></div>
          <div className="vp-arrow-label">result</div>
        </div>
        <div className="vp-result">Foritech<br />Verified ✓</div>
      </div>
    </>
  );
}
