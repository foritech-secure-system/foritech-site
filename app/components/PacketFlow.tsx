"use client";
export default function PacketFlow() {
  return (
    <>
      <style>{`
        .pf-wrap { position: relative; height: 72px; background: #111317; border: 0.5px solid rgba(255,255,255,0.08); border-radius: 8px; overflow: hidden; display: flex; align-items: center; }
        .pf-left { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-size: 10px; color: #6b7280; font-family: monospace; white-space: nowrap; }
        .pf-right { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); font-size: 10px; color: #22c55e; font-family: monospace; white-space: nowrap; }
        .pf-line { position: absolute; top: 50%; left: 90px; right: 90px; height: 1px; background: rgba(255,255,255,0.08); transform: translateY(-50%); }
        .pf-packet { position: absolute; top: 50%; width: 9px; height: 9px; border-radius: 50%; transform: translateY(-50%); }
        .pf-ok1 { background: #22c55e; box-shadow: 0 0 8px rgba(34,197,94,0.8); animation: pfok 2.4s linear infinite; }
        .pf-ok2 { background: #22c55e; box-shadow: 0 0 8px rgba(34,197,94,0.8); animation: pfok 2.4s linear infinite 0.8s; }
        .pf-bad { background: #ef4444; box-shadow: 0 0 8px rgba(239,68,68,0.8); animation: pfbad 2.4s linear infinite 1.6s; }
        @keyframes pfok { 0%{left:90px;opacity:0} 8%{opacity:1} 92%{opacity:1} 100%{left:calc(100% - 92px);opacity:0} }
        @keyframes pfbad { 0%{left:90px;opacity:0} 8%{opacity:1} 55%{left:55%;opacity:1} 65%{left:55%;opacity:0;transform:translateY(-50%) scale(1.8)} 100%{left:55%;opacity:0} }
        .pf-reject { position: absolute; left: 55%; top: 50%; transform: translate(-50%,-50%); font-size: 9px; color: #ef4444; opacity: 0; animation: pfreject 2.4s linear infinite 1.6s; white-space: nowrap; font-family: monospace; }
        @keyframes pfreject { 0%,55%{opacity:0} 65%,80%{opacity:1} 100%{opacity:0} }
      `}</style>
      <div className="pf-wrap">
        <div className="pf-left">IoT Device</div>
        <div className="pf-line">
          <div className="pf-packet pf-ok1" />
          <div className="pf-packet pf-ok2" />
          <div className="pf-packet pf-bad" />
          <div className="pf-reject">REJECTED</div>
        </div>
        <div className="pf-right">VERIFIED ✓</div>
      </div>
    </>
  );
}
