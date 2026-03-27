export const metadata = {
  title: "Foritech Notary API — Post-Quantum Proof of Existence",
  description: "Timestamp your data with post-quantum cryptographic proof. ML-DSA-65 signed tokens via a single API call.",
};

export default function NotaryPage() {
  return (
    <main className="bg-[#080C10] text-white min-h-screen font-mono">
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#080C10]/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#00FF88] rounded-sm flex items-center justify-center">
              <span className="text-black text-xs font-bold">F</span>
            </div>
            <span className="text-sm font-bold tracking-widest">FORITECH</span>
          </a>
          <span className="text-xs text-[#00FF88] tracking-wider border border-[#00FF88]/30 px-3 py-1">NOTARY API</span>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 pt-28 pb-24">

        {/* HERO */}
        <div className="border-b border-white/10 pb-12 mb-12">
          <div className="text-xs text-[#00FF88] tracking-[0.3em] mb-4">FORITECH NOTARY</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Timestamp your data with<br />
            <span className="text-[#00FF88]">post-quantum cryptographic proof.</span>
          </h1>
          <p className="text-white/50 text-base max-w-2xl mb-8">
            Foritech Notary creates a ML-DSA-65 signed proof-of-existence token for any data hash.
            No blockchain. No middleman. Verifiable offline.
          </p>
          <div className="flex flex-wrap gap-4 mb-8">
            <a href="https://notary.foritech.bg/notary/info" target="_blank"
              className="bg-[#00FF88] text-black px-6 py-3 text-sm font-bold tracking-wider hover:bg-[#00FF88]/90 transition-colors">
              TRY API →
            </a>
            <a href="mailto:security@foritech.bg"
              className="border border-white/20 text-white/70 px-6 py-3 text-sm tracking-wider hover:border-white/40 transition-colors">
              GET API KEY
            </a>
          </div>
          <div className="flex flex-wrap gap-6 text-xs text-white/30 tracking-wider">
            <span>✓ PQC-SECURED (ML-DSA-65)</span>
            <span>✓ NO BLOCKCHAIN NEEDED</span>
            <span>✓ VERIFIABLE OFFLINE</span>
            <span>✓ GDPR SAFE (hash only)</span>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div className="mb-16">
          <div className="text-xs text-white/30 tracking-[0.3em] mb-8">HOW IT WORKS</div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { num: "01", title: "Hash your data", desc: "Compute SHA3-256 of your document, file, or dataset. We never see your raw data." },
              { num: "02", title: "Call /notarize", desc: "Send the hash with your API key. Receive a ML-DSA-65 signed proof-of-existence token." },
              { num: "03", title: "Verify anytime", desc: "Token is verifiable offline or via /notary/verify. Proof is permanent and unforgeable." },
            ].map((s) => (
              <div key={s.num} className="border border-white/5 p-6">
                <div className="text-3xl font-bold text-white/10 mb-4">{s.num}</div>
                <h3 className="text-sm font-bold text-white/80 mb-2">{s.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CODE EXAMPLE */}
        <div className="mb-16">
          <div className="text-xs text-white/30 tracking-[0.3em] mb-8">START IN 2 MINUTES</div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="text-xs text-white/30 tracking-wider mb-3">1. HASH YOUR DATA</div>
              <div className="bg-[#0D1117] border border-white/10 p-4 rounded-sm">
                <pre className="text-xs text-[#00FF88] leading-relaxed">{`python3 -c "
import hashlib, base64
data = open('myfile.pdf','rb').read()
h = hashlib.sha3_256(data).digest()
print(base64.b64encode(h).decode())
"`}</pre>
              </div>
            </div>
            <div>
              <div className="text-xs text-white/30 tracking-wider mb-3">2. NOTARIZE</div>
              <div className="bg-[#0D1117] border border-white/10 p-4 rounded-sm">
                <pre className="text-xs text-[#00FF88] leading-relaxed">{`curl -X POST \\
  https://notary.foritech.bg/notarize \\
  -H "X-API-Key: YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"hash": "<base64_hash>"}'`}</pre>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-xs text-white/30 tracking-wider mb-3">RESPONSE</div>
            <div className="bg-[#0D1117] border border-[#00FF88]/20 p-4 rounded-sm">
              <pre className="text-xs text-[#00FF88] leading-relaxed">{`{
  "token": "<ML-DSA-65 signed proof token>",
  "timestamp": 1711541234,
  "issuer": "foritech-notary"
}`}</pre>
            </div>
          </div>
        </div>

        {/* USE CASES */}
        <div className="mb-16">
          <div className="text-xs text-white/30 tracking-[0.3em] mb-8">USE CASES</div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: "🤖", title: "AI / Content", desc: "Prove when AI-generated content was created. Anti-deepfake layer." },
              { icon: "⚖️", title: "Legal / IP", desc: "Proof of authorship for code, documents, ideas." },
              { icon: "🏭", title: "Supply Chain", desc: "Timestamp production events and batch records." },
              { icon: "👨‍💻", title: "Developers", desc: "Add proof-of-existence to any application in one API call." },
            ].map((u) => (
              <div key={u.title} className="border border-white/5 p-6 hover:border-white/10 transition-colors">
                <div className="text-2xl mb-3">{u.icon}</div>
                <h3 className="text-sm font-bold text-white/80 mb-2">{u.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* PRICING */}
        <div className="mb-16">
          <div className="text-xs text-white/30 tracking-[0.3em] mb-8">PRICING</div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "FREE", price: "€0", period: "forever", features: ["1,000 notarizations/month", "Standard API access", "Community support"], highlight: false },
              { name: "DEVELOPER", price: "€9", period: "per month", features: ["10,000 notarizations/month", "Priority API access", "Email support", "Audit logs"], highlight: true },
              { name: "ENTERPRISE", price: "Custom", period: "", features: ["Unlimited notarizations", "SLA guarantee", "Dedicated cluster", "Legal-grade logs"], highlight: false },
            ].map((p) => (
              <div key={p.name} className={`border p-6 ${p.highlight ? "border-[#00FF88]/40 bg-[#00FF88]/5" : "border-white/5"}`}>
                <div className="text-xs tracking-[0.3em] text-white/40 mb-3">{p.name}</div>
                <div className="text-3xl font-bold mb-1">{p.price}</div>
                <div className="text-xs text-white/30 mb-6">{p.period}</div>
                <ul className="space-y-2 mb-6">
                  {p.features.map((f) => (
                    <li key={f} className="text-xs text-white/50 flex gap-2">
                      <span className="text-[#00FF88]">✓</span>{f}
                    </li>
                  ))}
                </ul>
                <a href="mailto:security@foritech.bg"
                  className={`block text-center text-xs py-2.5 tracking-wider transition-colors ${p.highlight ? "bg-[#00FF88] text-black font-bold" : "border border-white/20 text-white/60 hover:border-white/40"}`}>
                  {p.name === "ENTERPRISE" ? "CONTACT US" : "GET API KEY"}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* LEGAL */}
        <div className="border border-white/5 p-6 mb-16 bg-white/[0.01]">
          <div className="text-xs text-white/30 tracking-wider mb-2">LEGAL NOTICE</div>
          <p className="text-xs text-white/40 leading-relaxed">
            This service provides cryptographic proof-of-existence using post-quantum signatures (ML-DSA-65).
            It is <strong className="text-white/60">NOT</strong> a qualified electronic signature under eIDAS and does not constitute a legal timestamp
            under applicable regulations. Foritech Notary tokens provide technical proof that a hash existed at a
            specific time and was signed by the Foritech Notary service.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Start notarizing in 60 seconds.</h2>
          <p className="text-white/40 text-sm mb-8">Free tier. No credit card required.</p>
          <a href="mailto:security@foritech.bg"
            className="bg-[#00FF88] text-black px-8 py-4 text-sm font-bold tracking-wider hover:bg-[#00FF88]/90 transition-colors">
            GET YOUR FREE API KEY →
          </a>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex justify-between">
          <div className="text-xs text-white/20">© 2026 Foritech — Notary API v0.1.0</div>
          <a href="/" className="text-xs text-white/30 hover:text-white/60 transition-colors">← Back to foritech.bg</a>
        </div>
      </div>
    </main>
  );
}
