"use client";
import { useState } from "react";

export default function VerifyWidget() {
  const [token, setToken] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const verify = async () => {
    if (!token.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const encoded = encodeURIComponent(token.trim());
      const r = await fetch(`https://notary.foritech.bg/notary/verify/${encoded}`);
      const d = await r.json();
      setResult(d);
    } catch {
      setResult({ error: "Request failed" });
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <textarea
        value={token}
        onChange={e => setToken(e.target.value)}
        rows={3}
        placeholder="Paste your notarization token here..."
        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#00FF88]/40 resize-none font-mono"
      />
      <button onClick={verify} disabled={loading}
        className="bg-[#00FF88] text-black px-6 py-2.5 text-xs font-bold tracking-wider hover:bg-[#00FF88]/90 transition-colors disabled:opacity-50">
        {loading ? "VERIFYING..." : "VERIFY TOKEN →"}
      </button>
      {result && (
        <div className={`border p-4 ${result.valid ? "border-[#00FF88]/30 bg-[#00FF88]/5" : "border-red-500/30 bg-red-500/5"}`}>
          <div className={`text-sm font-bold mb-2 ${result.valid ? "text-[#00FF88]" : "text-red-400"}`}>
            {result.error ? "ERROR" : result.valid ? "✓ VALID" : "✗ INVALID"}
          </div>
          {!result.error && (
            <div className="space-y-1 text-xs text-white/50">
              <div>Timestamp: {result.timestamp ? new Date(result.timestamp * 1000).toISOString() : "-"}</div>
              <div>Issuer: {result.issuer}</div>
              <div>Algorithm: {result.sig_alg}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
