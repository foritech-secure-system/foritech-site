"use client";
import PacketFlow from "./components/PacketFlow";
import VerificationPulse from "./components/VerificationPulse";
import TypingTagline from "./components/TypingTagline";
import SecurityScore from "./components/SecurityScore";
import { useState, useEffect, useRef } from "react";

function ContactForm() {
  const [status, setStatus] = useState<"idle"|"sending"|"done"|"error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("https://formspree.io/f/xzdjnlgg", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) { setStatus("done"); form.reset(); }
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-xs text-white/30 tracking-wider block mb-2">NAME</label>
        <input name="name" required
          className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00FF88]/40"
          placeholder="Your name" />
      </div>
      <div>
        <label className="text-xs text-white/30 tracking-wider block mb-2">EMAIL</label>
        <input name="email" type="email" required
          className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00FF88]/40"
          placeholder="name@company.com" />
      </div>
      <div>
        <label className="text-xs text-white/30 tracking-wider block mb-2">MESSAGE</label>
        <textarea name="message" required rows={4}
          className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00FF88]/40 resize-none"
          placeholder="Interested in a pilot deployment..." />
      </div>
      <button type="submit" disabled={status === "sending"}
        className="bg-[#00FF88] text-black px-6 py-3 text-xs font-bold tracking-wider hover:bg-[#00FF88]/90 transition-colors disabled:opacity-50">
        {status === "sending" ? "SENDING..." : status === "done" ? "✓ SENT" : "SEND MESSAGE"}
      </button>
      {status === "error" && <p className="text-xs text-red-400">Something went wrong. Try again.</p>}
    </form>
  );
}

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [verifyResult, setVerifyResult] = useState<null | "VALID" | "INVALID">(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const copyInstall = () => {
    navigator.clipboard.writeText("curl -fsSL https://edge.forisec.eu/install.sh | bash");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const simulateVerify = () => {
    setIsVerifying(true);
    setVerifyResult(null);
    setTimeout(() => {
      setIsVerifying(false);
      setVerifyResult("VALID");
    }, 1800);
  };

  return (
    <main className="bg-[#080C10] text-white min-h-screen font-mono overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#080C10]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#00FF88] rounded-sm flex items-center justify-center">
              <span className="text-black text-xs font-bold">F</span>
            </div>
            <span className="text-sm font-bold tracking-widest text-white/90">FORITECH</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-xs text-white/40 tracking-wider">
            <a href="#how" className="hover:text-white/80 transition-colors">HOW IT WORKS</a>
            <a href="#demo" className="hover:text-white/80 transition-colors">DEMO</a>
            <a href="#pricing" className="hover:text-white/80 transition-colors">PRICING</a>
            <a href="https://www.foritech.bg/investor.html" className="hover:text-white/80 transition-colors">INVESTORS</a>
          </div>
          <a href="mailto:security@foritech.bg"
            className="text-xs border border-[#00FF88]/40 text-[#00FF88] px-4 py-1.5 hover:bg-[#00FF88]/10 transition-colors tracking-wider">
            CONTACT
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-center pt-14 px-6">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-xs text-[#00FF88] tracking-[0.3em] mb-8 opacity-70">
                FORITECH SECURE SYSTEM
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 tracking-tight">
                In a world where AI can fake anything,{" "}
                <span className="text-[#00FF88]">Foritech proves what is real.</span>
              </h1>
              <p className="text-white/50 text-base md:text-lg leading-relaxed mb-10 max-w-lg">
                Foritech cryptographically verifies that telemetry and machine data
                came from the right device and was not altered.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#demo"
                  className="bg-[#00FF88] text-black px-6 py-3 text-sm font-bold tracking-wider hover:bg-[#00FF88]/90 transition-colors">
                  TRY WITH YOUR DEVICE
                </a>
                <a href="https://www.foritech.bg/investor.html"
                  className="border border-white/20 text-white/70 px-6 py-3 text-sm tracking-wider hover:border-white/40 hover:text-white transition-colors">
                  FOR INVESTORS
                </a>
              </div>
              <div className="mt-8 flex items-center gap-6 text-xs text-white/30 tracking-wider">
                <span>POST-QUANTUM SECURED</span>
                <span className="text-white/10">•</span>
                <span>REAL-TIME VERIFICATION</span>
                <span className="text-white/10">•</span>
                <span>INDUSTRIAL READY</span>
              </div>
            </div>

            {/* Pipeline visualization */}
            <div className="relative">
              <div className="border border-white/5 bg-white/[0.02] p-6 rounded-sm">
                <div className="text-xs text-white/30 tracking-wider mb-6">LIVE PIPELINE</div>
                <div className="space-y-3">
                  {[
                    { label: "Sensor", status: "SIGNING", color: "text-blue-400" },
                    { label: "ML-DSA-65 Container", status: "WRAPPED", color: "text-yellow-400" },
                    { label: "Transport (HTTP/MQTT)", status: "SENDING", color: "text-purple-400" },
                    { label: "Foritech Verification", status: "VERIFIED", color: "text-[#00FF88]" },
                  ].map((step, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-white/5">
                      <div className="flex items-center gap-3">
                        <div className={`w-1.5 h-1.5 rounded-full ${i === 3 ? "bg-[#00FF88]" : "bg-white/20"}`} />
                        <span className="text-xs text-white/60">{step.label}</span>
                      </div>
                      <span className={`text-xs font-bold ${step.color}`}>{step.status}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-3 bg-[#00FF88]/5 border border-[#00FF88]/20 rounded-sm">
                  <div className="text-xs text-[#00FF88] font-bold">VERIFIED</div>
                  <div className="text-xs text-white/40 mt-1">device_id: 6acd1ccb...c237</div>
                  <div className="text-xs text-white/40">kid: 6e669d49...bdad</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-xs text-white/30 tracking-[0.3em] mb-12">THE PROBLEM</div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Telemetry spoofing",
                desc: "Attackers can inject fake values into MQTT, HTTP or file-based pipelines. No one can tell the difference.",
              },
              {
                title: "Silent data tampering",
                desc: "Values may be modified on the way to storage. No cryptographic proof exists of what was authentic.",
              },
              {
                title: "Future crypto risk",
                desc: "Classical cryptography (RSA, ECDSA) will be broken by quantum computers. Infrastructure built today needs PQC.",
              },
            ].map((item, i) => (
              <div key={i} className="border border-white/5 p-6 hover:border-white/10 transition-colors">
                <div className="w-8 h-0.5 bg-red-500/60 mb-4" />
                <h3 className="text-sm font-bold text-white/80 mb-3 tracking-wide">{item.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-xs text-white/30 tracking-[0.3em] mb-4">HOW IT WORKS</div>
          <div className="mt-8 mb-6">
          <TypingTagline />
          </div>
          <div className="mt-8">
          <PacketFlow />
          </div>
        
          <h2 className="text-3xl font-bold mb-16">
            When AI can fabricate logs, images, and telemetry,<br />
            <span className="text-white/50">industries need a way to prove what data is real.</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-0">
            {[
              {
                num: "01",
                title: "Collect",
                desc: "Read telemetry from your device sensors, PLCs or file sources.",
                color: "border-blue-500/30",
              },
              {
                num: "02",
                title: "Sign",
                desc: "ML-DSA-65 post-quantum signature bound to device identity, timestamp and nonce.",
                color: "border-yellow-500/30",
              },
              {
                num: "03",
                title: "Transport",
                desc: "Send the signed .ftech container via HTTP, MQTT or file transfer.",
                color: "border-purple-500/30",
              },
              {
                num: "04",
                title: "Verify",
                desc: "Foritech server verifies signature and replay protection. Returns VERIFIED or REJECTED.",
                color: "border-[#00FF88]/30",
              },
            ].map((step, i) => (
              <div key={i} className={`border-t-2 ${step.color} pt-6 px-6 pb-6`}>
                <div className="text-3xl font-bold text-white/10 mb-4">{step.num}</div>
                <h3 className="text-sm font-bold text-white/80 mb-3 tracking-wide">{step.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-xs text-white/50 tracking-wider text-center">
            Device → Foritech Edge Agent → .ftech Container → Foritech Verification API → Trusted Pipeline
          </div>
          <div className="mt-10">
          <VerificationPulse />
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-xs text-white/60 tracking-[0.3em] mb-4">DATA TRUST COMPARISON</div>
          <h2 className="text-3xl font-bold mb-3">
            MQTT tells you data arrived.<br />
            <span className="text-[#00FF88]">Foritech proves data is real.</span>
          </h2>
          <p className="text-white/60 mb-10 text-sm max-w-xl">
            Foritech does not replace MQTT, Kafka, or OPC UA. It sits on top —
            adding cryptographic proof to every packet.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 pr-6 text-white/50 font-normal tracking-wider text-xs">CAPABILITY</th>
                  <th className="text-center py-3 px-8 text-white/50 font-normal tracking-wider text-xs">MQTT (TLS only)</th>
                  <th className="text-center py-3 px-8 text-[#00FF88] font-normal tracking-wider text-xs">MQTT + FORITECH</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Security model",         "Trust the network",    "Zero Trust"],
                  ["Data protection",        "In transit only",      "End-to-end"],
                  ["Broker visibility",      "Broker sees data",     "Broker is blind"],
                  ["Authentication",         "Connection-level",     "Per-message (ML-DSA)"],
                  ["Tamper protection",      "❌",                   "✅"],
                  ["Replay protection",      "❌",                   "✅"],
                  ["Data origin proof",      "❌",                   "✅"],
                  ["Broker compromised",     "Data exposed",         "Data stays secure"],
                ].map(([cap, a, b], i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="py-4 pr-6 text-white/80">{cap}</td>
                    <td className="py-4 px-8 text-center text-white/40">{a}</td>
                    <td className="py-4 px-8 text-center font-bold text-[#00FF88]">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-white/30 text-xs mt-8 text-center">
            Foritech is not an IoT platform. It does not collect, store, or visualize data.<br />
            It is the <span className="text-white/60">cryptographic trust layer</span> for machine data.
          </p>
        </div>
      </section>
      {/* DEMO */}
      <section id="demo" className="py-24 px-6 border-t border-white/5 bg-white/[0.01]">
        <p className="text-white/50 text-sm mb-8">See how fake data gets rejected.</p>
        <div className="max-w-6xl mx-auto">
          <div className="text-xs text-white/30 tracking-[0.3em] mb-4">LIVE DEMO</div>
          <h2 className="text-3xl font-bold mb-4">Try it in 2 minutes</h2>
          <p className="text-white/40 text-sm mb-12 max-w-xl">
            Install the Foritech Edge Agent on any Linux device. It generates ML-DSA-65 keys,
            signs telemetry and sends it to the verification API.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Install */}
            <div>
              <div className="text-xs text-white/30 tracking-wider mb-4">STEP 1 — INSTALL</div>
              <div className="bg-[#0D1117] border border-white/10 p-4 rounded-sm flex items-center justify-between group">
                <code className="text-xs text-[#00FF88]">
                  curl -fsSL https://edge.forisec.eu/install.sh | bash
                </code>
                <button onClick={copyInstall}
                  className="text-xs text-white/30 hover:text-white/70 transition-colors ml-4 shrink-0">
                  {copied ? "✓ COPIED" : "COPY"}
                </button>
              </div>
              <div className="mt-4 space-y-2">
                {[
                  "[OK-FORITECH] System dependencies installed",
                  "[OK-FORITECH] liboqs (PQC) built",
                  "[OK-FORITECH] ML-DSA-65 keys generated",
                  "[OK-FORITECH] Edge Agent ready — trust decisions are never made on the device.",
                ].map((line, i) => (
                  <div key={i} className="text-xs text-white/30 font-mono">{line}</div>
                ))}
              </div>
            </div>

            {/* Verify */}
            <div>
              <div className="text-xs text-white/30 tracking-wider mb-4">STEP 2 — VERIFY</div>
              <button onClick={simulateVerify}
                className="w-full bg-[#0D1117] border border-white/10 p-4 text-left hover:border-[#00FF88]/30 transition-colors group">
                <code className="text-xs text-white/50 group-hover:text-white/70">
                  curl -X POST https://verify.foritech.bg/verify \<br />
                  &nbsp;&nbsp;--data-binary @telemetry.ftech
                </code>
              </button>
              <div className="mt-4 bg-[#0D1117] border border-white/10 p-4 min-h-[100px]">
                {isVerifying && (
                  <div className="text-xs text-yellow-400 animate-pulse">Verifying...</div>
                )}
                {verifyResult === "VALID" && (
                  <pre className="text-xs text-[#00FF88]">{JSON.stringify({
                    result: "VERIFIED",
                    device_id: "6acd1ccb...c237",
                    kid: "6e669d49...bdad",
                    size: 6282
                  }, null, 2)}</pre>
                )}
                {!isVerifying && !verifyResult && (
                  <div className="text-xs text-white/20">Click to simulate verification →</div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <a href="https://github.com/foritech-secure-system/foritech-edge"
              target="_blank"
              className="text-xs text-white/30 hover:text-white/60 transition-colors tracking-wider">
              VIEW ON GITHUB →
            </a>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-xs text-white/30 tracking-[0.3em] mb-12">USE CASES</div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: "🏭", title: "Industrial telemetry integrity", desc: "Machine telemetry integrity for PLCs and sensors" },
              { icon: "⚡", title: "Energy", desc: "Fraud-proof energy readings — cryptographically verified" },
              { icon: "📡", title: "Telecom", desc: "Verified network logs — tamper-evident by design" },
              { icon: "🏙", title: "Smart Infrastructure", desc: "Trusted sensor data — proven origin and integrity" },
            ].map((item, i) => (
              <div key={i} className="border border-white/5 p-6 hover:border-white/10 transition-colors">
                <div className="text-2xl mb-4">{item.icon}</div>
                <h3 className="text-sm font-bold text-white/80 mb-2">{item.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      
      {/* PRICING */}
      
            
      
      <section id="pricing" className="py-24 px-6 border-t border-white/5 bg-white/[0.01]">
              <div className="max-w-6xl mx-auto">
                <div className="text-xs text-white/30 tracking-[0.3em] mb-4">PRICING</div>
                <h2 className="text-3xl font-bold mb-4">Simple pricing for real machine-data proof.</h2>
                <p className="text-white/50 text-sm mb-16 max-w-3xl">
                  Start with devices or APIs. Add audit exports when needed. Move to Enterprise when you need dedicated deployment,
                  support, and scale.
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      name: "PILOT",
                      price: "€990",
                      period: "flat / 3 months",
                      hook: "Get first verified data in under 2 minutes.",
                      pain: "Detect if your data is being tampered with.",
                      bestFor: "First deployment. Low risk. Full access.",
                      includes: [
                        "up to 10 devices",
                        "full API access",
                        "onboarding included",
                        "dashboard + audit exports",
                        "dedicated setup support",
                        "From pilot to production in 3 months",
                      ],
                      extra: "anchor price — easy yes, no subscription risk",
                      cta: "START PILOT",
                      href: "mailto:security@foritech.bg?subject=Foritech%20Pilot%20-%20Start",
                      featured: false,
                    },
                    {
                      name: "PRODUCTION",
                      price: "€199",
                      period: "/ month",
                      hook: "Prove every data packet is real, at scale.",
                      pain: "Stop trusting data you cannot verify.",
                      bestFor: "After pilot. Unlimited devices. Pay per verify.",
                      includes: [
                        "unlimited devices",
                        "€0.002 / verification",
                        "dashboard + audit",
                        "SLA basic",
                        "priority support",
                        "natural upgrade from Pilot",
                      ],
                      extra: "most popular",
                      cta: "START PRODUCTION",
                      href: "mailto:security@foritech.bg?subject=Foritech%20Production",
                      featured: true,
                    },
                    {
                      name: "ENTERPRISE",
                      price: "Custom",
                      period: "",
                      hook: "On-prem. Compliance. Full control.",
                      pain: "Your data never leaves your infrastructure.",
                      bestFor: "Large deployments, regulated environments.",
                      includes: [
                        "on-prem / private cloud / hybrid",
                        "compliance & audit ready",
                        "dedicated onboarding",
                        "SLA options",
                        "architecture review",
                        "Pilot → Production → Enterprise path",
                      ],
                      extra: "Commercial rollout planning included",
                      cta: "TALK TO SALES",
                      href: "mailto:security@foritech.bg?subject=Foritech%20Enterprise",
                      featured: false,
                    },
                  ].map((plan) => (
                    <div
                      key={plan.name}
                      className={`border p-8 flex flex-col ${plan.featured ? "border-[#00FF88]/30 bg-[#00FF88]/5" : "border-white/5"}`}
                    >
                      <div className="text-xs tracking-[0.3em] text-white/40 mb-4">{plan.name}</div>
                      <div className="text-3xl font-bold leading-tight">{plan.price}</div>
                      {(plan as any).period && <div className="text-xs text-white/40 mb-3">{(plan as any).period}</div>}
                      {(plan as any).hook && <p className="text-sm text-white/80 font-medium mb-2 leading-snug">{(plan as any).hook}</p>}
                      {(plan as any).pain && <p className="text-xs text-white/45 mb-6 leading-relaxed">{(plan as any).pain}</p>}
                      {!(plan as any).hook && <p className="text-xs text-white/40 mb-6 leading-relaxed">{plan.bestFor}</p>}
                      <div className="text-xs text-white/30 tracking-wider mb-3">INCLUDES</div>
                      <ul className="space-y-2 mb-6 flex-1">
                        {plan.includes.map((f) => (
                          <li key={f} className="text-xs text-white/60 flex items-start gap-2 leading-relaxed">
                            <span className="text-[#00FF88] mt-0.5">✓</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs text-white/35 mb-8 leading-relaxed">{plan.extra}</p>
                      <a
                        href={plan.href}
                        className={`block text-center text-xs py-3 tracking-wider transition-colors ${plan.featured ? "bg-[#00FF88] text-black font-bold hover:bg-[#00FF88]/90" : "border border-white/20 text-white/70 hover:border-white/40 hover:text-white"}`}
                      >
                        {plan.cta}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="mt-20 grid lg:grid-cols-2 gap-10 items-start">
                  <div>
                    <div className="text-xs text-white/30 tracking-[0.3em] mb-4">WHAT HAPPENS AFTER PURCHASE</div>
                    <h3 className="text-2xl font-bold mb-4">Clear delivery after every purchase.</h3>
                    <p className="text-white/45 text-sm leading-relaxed max-w-2xl">
                      The buyer should always understand what they are buying, what they receive, and how they start.
                    </p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      ["Edge", "Installer access, enrollment instructions, licensed device slots, dashboard visibility, and first connected devices in the platform."],
                      ["Verify API", "API key, docs, verification access, usage tracking, quota visibility, and rate-limit visibility."],
                      ["Audit", "Structured proof package, verification history export, and downloadable evidence bundle."],
                      ["Enterprise", "Onboarding, pilot or rollout plan, deployment architecture discussion, and a commercial path to production."],
                    ].map(([title, desc]) => (
                      <div key={title} className="border border-white/5 p-5">
                        <div className="text-sm font-bold text-white/85 mb-2">{title}</div>
                        <p className="text-xs text-white/45 leading-relaxed">{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-20">
                  <div className="text-xs text-white/30 tracking-[0.3em] mb-4">FAQ</div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      ["What am I paying for?", "Cryptographic verification infrastructure that proves machine data came from the right device and was not altered."],
                      ["Is the dashboard included?", "Yes. Dashboard visibility is included in Edge plans and expanded in Enterprise deployments."],
                      ["Do I need to use the API?", "No. You can start with Edge only. The API is for teams that want direct integration."],
                      ["Is Audit separate from Enterprise?", "Yes. Audit can be purchased separately, but it is usually bundled into Enterprise engagements."],
                      ["Do you offer on-prem deployment?", "Yes. Private cloud, on-prem, and hybrid deployment options are available through Enterprise."],
                    ].map(([q, a]) => (
                      <div key={q} className="border border-white/5 p-5">
                        <div className="text-sm font-bold text-white/85 mb-2">{q}</div>
                        <p className="text-xs text-white/45 leading-relaxed">{a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* INVESTORS */}
            <section id="investors" className="py-24 px-6 border-t border-white/5">
              <div className="max-w-6xl mx-auto">
                <div className="text-xs text-white/30 tracking-[0.3em] mb-4">FOR INVESTORS</div>
                <div className="grid md:grid-cols-2 gap-16 items-start">
                  <div>
                    <h2 className="text-3xl font-bold mb-6">
                      Building the standard for machine data authenticity.
                    </h2>
                    <p className="text-white/50 text-sm leading-relaxed mb-8">
                      Foritech Secure System is a cryptographic verification platform for telemetry
                      and machine data. It acts like a digital notary, proving where data came from
                      and whether it was altered.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {[
                        { label: "Market", value: "Industrial telemetry integrity + AI data verification" },
                        { label: "Model", value: "Verification SaaS + Device licensing" },
                        { label: "Moat", value: "PQC-first, closed verify engine" },
                        { label: "Status", value: "v0.8 — IoT2050 validated" },
                      ].map((item, i) => (
                        <div key={i} className="border border-white/5 p-4">
                          <div className="text-xs text-white/30 mb-1">{item.label}</div>
                          <div className="text-xs text-white/70">{item.value}</div>
                        </div>
                      ))}
                    </div>
                    <a href="mailto:security@foritech.bg"
                      className="inline-block text-xs border border-[#00FF88]/40 text-[#00FF88] px-6 py-3 hover:bg-[#00FF88]/10 transition-colors tracking-wider">
                      REQUEST ONE-PAGER →
                    </a>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: "Per verification", value: "€0.001 – €0.01" },
                      { label: "Device license", value: "€5 – €20 / device / month" },
                      { label: "Enterprise node", value: "€50k – €250k" },
                      { label: "Target devices (Y1)", value: "10,000" },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center border-b border-white/5 pb-4">
                        <span className="text-xs text-white/40">{item.label}</span>
                        <span className="text-xs font-bold text-[#00FF88]">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-24 px-6 border-t border-white/5 bg-white/[0.01]">
              <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-6">Start small. Prove value fast. Scale when you're ready.</h2>
                <p className="text-white/40 text-sm mb-10 max-w-2xl mx-auto">
                  Begin with a pilot, connect your first devices, and turn machine-data verification into a production capability.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <a href="#pricing"
                    className="bg-[#00FF88] text-black px-8 py-4 text-sm font-bold tracking-wider hover:bg-[#00FF88]/90 transition-colors">
                    START WITH EDGE
                  </a>
                  <a href="#pricing"
                    className="border border-white/20 text-white/70 px-8 py-4 text-sm tracking-wider hover:border-white/40 hover:text-white transition-colors">
                    GET API ACCESS
                  </a>
                  <a href="mailto:security@foritech.bg?subject=Foritech%20Enterprise%20Pilot"
                    className="border border-[#00FF88]/30 text-[#00FF88] px-8 py-4 text-sm tracking-wider hover:bg-[#00FF88]/10 transition-colors">
                    BOOK ENTERPRISE PILOT
                  </a>
                </div>
                <section className="py-16 px-6 border-t border-white/5">
                <div className="max-w-3xl mx-auto">
                <SecurityScore />
                </div>
                </section>
              </div>
            </section>

      



      {/* INVESTORS */}
      <section id="investors" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-xs text-white/30 tracking-[0.3em] mb-4">FOR INVESTORS</div>
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Building the standard for machine data authenticity.
              </h2>
              <p className="text-white/50 text-sm leading-relaxed mb-8">
                Foritech Secure System is a cryptographic verification platform for telemetry
                and machine data. It acts like a digital notary, proving where data came from
                and whether it was altered.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: "Market", value: "Industrial telemetry integrity + AI data verification" },
                  { label: "Model", value: "Verification SaaS + Device licensing" },
                  { label: "Moat", value: "PQC-first, closed verify engine" },
                  { label: "Status", value: "v0.8 — IoT2050 validated" },
                ].map((item, i) => (
                  <div key={i} className="border border-white/5 p-4">
                    <div className="text-xs text-white/30 mb-1">{item.label}</div>
                    <div className="text-xs text-white/70">{item.value}</div>
                  </div>
                ))}
              </div>
              <a href="mailto:security@foritech.bg"
                className="inline-block text-xs border border-[#00FF88]/40 text-[#00FF88] px-6 py-3 hover:bg-[#00FF88]/10 transition-colors tracking-wider">
                REQUEST ONE-PAGER →
              </a>
            </div>
            <div className="space-y-4">
              {[
                { label: "Per verification", value: "€0.001 – €0.01" },
                { label: "Device license", value: "€5 – €20 / device / month" },
                { label: "Enterprise node", value: "€50k – €250k" },
                { label: "Target devices (Y1)", value: "10,000" },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span className="text-xs text-white/40">{item.label}</span>
                  <span className="text-xs font-bold text-[#00FF88]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-6 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Start verifying your data today.</h2>
          <p className="text-white/40 text-sm mb-10">
            Free tier available. No credit card required.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#demo"
              className="bg-[#00FF88] text-black px-8 py-4 text-sm font-bold tracking-wider hover:bg-[#00FF88]/90 transition-colors">
              TRY WITH YOUR DEVICE
            </a>          
            <a href="https://www.foritech.bg/demo_dashbord.html"
              className="border border-white/20 text-white/70 px-8 py-4 text-sm tracking-wider hover:border-white/40 hover:text-white transition-colors">
              REQUEST DEMO
            </a>
          </div>
          <section className="py-16 px-6 border-t border-white/5">
          <div className="max-w-3xl mx-auto">
          <SecurityScore />
          </div>
          </section>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-xs text-white/30 tracking-[0.3em] mb-4">CONTACT</div>
          <h2 className="text-3xl font-bold mb-4">Get in touch</h2>
          <p className="text-white/40 text-sm mb-12 max-w-xl">
            Interested in a pilot deployment, partnership or investment? Send us a message.
          </p>
          <div className="grid md:grid-cols-2 gap-12">
            <ContactForm />
            <div className="space-y-6">
              <div>
                <div className="text-xs text-white/30 tracking-wider mb-2">EMAIL</div>
                <div className="text-sm text-white/70">security@foritech.bg</div>
              </div>
              <div>
                <div className="text-xs text-white/30 tracking-wider mb-2">GITHUB</div>
                <a href="https://github.com/foritech-secure-system"
                  className="text-sm text-[#00FF88] hover:underline" target="_blank">
                  github.com/foritech-secure-system
                </a>
              </div>
              <div>
                <div className="text-xs text-white/30 tracking-wider mb-2">EDGE INSTALLER</div>
                <div className="text-xs font-mono text-white/50">
                  curl -fsSL https://edge.forisec.eu/install.sh | bash
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 bg-[#00FF88] rounded-sm flex items-center justify-center">
                <span className="text-black text-xs font-bold">F</span>
              </div>
              <span className="text-sm font-bold tracking-widest">FORITECH</span>
            </div>
            <p className="text-xs text-white/30 max-w-xs">
              Foritech Secure System — quantum-safe integrity for industrial machine data.
            </p>
          </div>
          <div className="flex gap-12">
            <div>
              <div className="text-xs text-white/20 tracking-wider mb-3">PRODUCT</div>
              <div className="space-y-2">
                {[["Docs", "#"], ["GitHub", "https://github.com/foritech-secure-system"], ["Edge Agent", "https://edge.forisec.eu/install.sh"], ["Protocol Spec", "/specs/foritech-protocol-spec-v1"]].map(([l, href]) => (
                  <a key={l} href={href} className="text-xs text-white/40 hover:text-white/70 transition-colors block">{l}</a>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs text-white/20 tracking-wider mb-3">COMPANY</div>
              <div className="space-y-2">
                {["Contact", "Security", "Privacy"].map((l) => (
                  <div key={l} className="text-xs text-white/40 hover:text-white/70 cursor-pointer">{l}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-white/5">
          <p className="text-xs text-white/20">© 2026 Foritech. All rights reserved.</p>
        </div>
      </footer>

    </main>
  );
}
