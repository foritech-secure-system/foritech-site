export const metadata = {
  title: "Foritech Protocol Specification v1.0",
  description: "Foritech signed binary container format and verification model.",
};

export default function ProtocolSpec() {
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
          <span className="text-xs text-white/30 tracking-wider">PROTOCOL SPECIFICATION</span>
        </div>
      </nav>
      <div className="max-w-5xl mx-auto px-6 pt-28 pb-24">
        <div className="border-b border-white/10 pb-10 mb-12">
          <div className="text-xs text-[#00FF88] tracking-[0.3em] mb-4">FORITECH SECURE SYSTEM</div>
          <h1 className="text-4xl font-bold mb-4">Foritech Protocol Specification</h1>
          <div className="flex flex-wrap gap-6 text-xs text-white/40">
            <span>Version: <span className="text-white/70">1.0</span></span>
			<span>Status: <span className="text-[#00FF88]">IANA Registered</span></span>
			<span>IANA PEN: <span className="text-white/70">65385</span></span>
			<span>Registered: <span className="text-white/70">2026-04-15</span></span>
            <span>Media Type: <span className="text-white/70">application/vnd.foritech.container</span></span>
            <span>Extension: <span className="text-[#00FF88]">.ftech</span></span>
          </div>
          <p className="mt-6 text-white/50 text-sm leading-relaxed max-w-3xl">
            This document defines the signed binary container format and verification model
            used by Foritech Secure System — a cryptographic verification platform for telemetry
            and machine data.
          </p>
        </div>
        <div className="space-y-16 text-sm text-white/60 leading-relaxed">
          <Section num="1" title="Purpose">
            The Foritech protocol enables cryptographic verification of telemetry, machine-generated data,
            files, edge-to-cloud integrity records, and signed industrial or IoT payloads. The protocol
            provides authenticity, integrity, tamper evidence, deterministic verification results, and
            audit-ready verification behavior.
          </Section>
          <Section num="2" title="Design Principles">
            <ul className="space-y-2 mt-2">
              {["Never trust data before cryptographic verification",
                "All security-relevant metadata must be covered by the signature",
                "Malformed containers must be rejected",
                "Verification results must be deterministic",
                "Policy enforcement must be separated from parsing and signature verification",
              ].map((p) => <li key={p} className="flex gap-3"><span className="text-[#00FF88]">→</span>{p}</li>)}
            </ul>
          </Section>
          <Section num="3" title="Container Model">
            A Foritech container encapsulates four logical components bound into a single signed verification unit:
            <pre className="mt-4 bg-[#0D1117] border border-white/10 p-4 text-[#00FF88] text-xs">{`1. Header\n2. Metadata\n3. Payload\n4. Signature`}</pre>
          </Section>
          <Section num="4" title="Header">
            The header identifies the container format and protocol version. Fields include magic, version,
            algorithm, and container profile identifier. The header is part of the signed material.
            <pre className="mt-4 bg-[#0D1117] border border-white/10 p-4 text-[#00FF88] text-xs">{`magic:     "foritech"\nversion:   1\nalgorithm: ML-DSA`}</pre>
          </Section>
          <Section num="5" title="Metadata">
            Metadata contains fields required to interpret and validate the container. All metadata affecting
            trust, verification, routing, or replay handling must be covered by the signature.
            <pre className="mt-4 bg-[#0D1117] border border-white/10 p-4 text-[#00FF88] text-xs">{`device_id: "device-001"\ntimestamp: 1710000000\nkey_id:    "device-key-1"\nnonce:     "<random-value>"`}</pre>
          </Section>
          <Section num="6" title="Payload">
            The payload contains the actual data — telemetry samples, machine status, file contents, or
            industrial protocol output. The payload is treated as opaque data by the core verification engine.
          </Section>
          <Section num="7" title="Signature">
            The signature provides authenticity and integrity protection. It must cover header, metadata, and payload.
            <div className="mt-4 border border-[#00FF88]/20 bg-[#00FF88]/5 p-4">
              <div className="text-xs text-[#00FF88] tracking-wider mb-1">PRIMARY ALGORITHM</div>
              <div className="text-lg font-bold text-white">ML-DSA-65</div>
              <div className="text-xs text-white/40 mt-1">Post-quantum cryptography — NIST standardized. PQC-first protocol.</div>
            </div>
          </Section>
          <Section num="8" title="Container Creation">
            <ol className="space-y-2 mt-2 list-none">
              {["Construct header","Construct metadata","Attach payload",
                "Generate ML-DSA signature over header + metadata + payload",
                "Append signature","Serialize as binary .ftech container"
              ].map((s,i) => <li key={s} className="flex gap-3"><span className="text-white/20 font-bold">{i+1}.</span>{s}</li>)}
            </ol>
          </Section>
          <Section num="9" title="Container Verification">
            <pre className="mt-2 bg-[#0D1117] border border-white/10 p-4 text-[#00FF88] text-xs">{`1. Parse header\n2. Validate container structure\n3. Parse metadata\n4. Load verification key\n5. Verify signature\n6. Return VERIFIED or REJECTED`}</pre>
          </Section>
          <Section num="10" title="Verification Output">
            Verification produces one of two results. No partial trust state is permitted.
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="border border-[#00FF88]/30 bg-[#00FF88]/5 p-4 text-center">
                <div className="text-xl font-bold text-[#00FF88]">VERIFIED</div>
              </div>
              <div className="border border-red-500/30 bg-red-500/5 p-4 text-center">
                <div className="text-xl font-bold text-red-400">REJECTED</div>
              </div>
            </div>
          </Section>
          <Section num="11" title="Core Verification vs Service-Layer Policy">
            Core verification handles parsing, structure validation, key loading, signature verification, and
            produces VERIFIED or REJECTED. Service-layer policy handles replay protection, timestamp windows,
            key lifecycle, device allowlists, and audit logging. This separation keeps the core deterministic and portable.
          </Section>
          <Section num="12" title="Replay Protection">
            Replay protection is not guaranteed by signature validity alone. Mitigation uses timestamp validation,
            nonce tracking, device identity tracking, and service-side replay caches enforced by the platform layer.
          </Section>
          <Section num="13" title="Security Requirements">
            Strict parsing, explicit signature verification, deterministic behavior, rejection of malformed
            containers, rejection of altered signed content. All trust-relevant metadata must be signed.
            Unsigned metadata must not influence trust decisions. Fail closed on errors.
          </Section>
          <Section num="14" title="Interoperability">
            Requires shared container specification, deterministic serialization, agreement on protocol version,
            metadata semantics, and signature algorithm. Payload interpretation may vary but verification behavior must be consistent.
          </Section>
          <Section num="15" title="Media Type Registration ">
            <pre className="mt-2 bg-[#0D1117] border border-white/10 p-4 text-[#00FF88] text-xs">{'Media Type: application/vnd.foritech.container
                                                                                                   Extension:  .ftech
                                                                                                   IANA Status: Registered (2026-04-15)
                                                                                                   IANA PEN: 65385\nUsage: LIMITED USE'}
            </pre>
          </Section>
          <Section num="16" title="Verification Philosophy">
            <div className="border border-white/10 p-8 text-center bg-white/[0.02] mt-2">
              <p className="text-lg font-bold text-white/90">&quot;Never trust data without cryptographic verification.&quot;</p>
              <p className="mt-3 text-xs text-white/40">A container is either verified or rejected — no partial trust.</p>
            </div>
          </Section>
          <Section num="17" title="Error Codes">
            Verification rejection must include a reason code.
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead><tr className="border-b border-white/10">
                  <th className="text-left py-2 pr-8 text-white/40 font-normal tracking-wider">CODE</th>
                  <th className="text-left py-2 text-white/40 font-normal tracking-wider">MEANING</th>
                </tr></thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    ["INVALID_SIGNATURE", "Signature verification failed"],
                    ["MALFORMED_CONTAINER", "Container structure is invalid or incomplete"],
                    ["UNKNOWN_KEY", "key_id not found in trusted key registry"],
                    ["EXPIRED_TIMESTAMP", "Timestamp outside the accepted replay window"],
                    ["REPLAY_DETECTED", "Nonce has been seen before"],
                    ["UNSUPPORTED_VERSION", "Protocol version not supported"],
                    ["UNSUPPORTED_ALGORITHM", "Signature algorithm not in approved registry"],
                    ["POLICY_VIOLATION", "Container rejected by service-layer policy"],
                  ].map(([code, meaning]) => (
                    <tr key={code}>
                      <td className="py-2 pr-8 text-[#00FF88] font-mono">{code}</td>
                      <td className="py-2 text-white/50">{meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
          <Section num="18" title="Versioning Policy">
            The container header includes a version field identifying the protocol version.
            Implementations must reject containers with unsupported versions with reason code UNSUPPORTED_VERSION.
            Version negotiation is not performed. Producers must declare the version they use.
            Consumers must explicitly support that version. Backward compatibility is not guaranteed across major versions.
            <pre className="mt-4 bg-[#0D1117] border border-white/10 p-4 text-[#00FF88] text-xs">{`Current version: 1`}</pre>
          </Section>
          <Section num="19" title="Canonicalization Rules">
            Deterministic signing requires a canonical serialization of the signed material.
            <ul className="space-y-2 mt-4">
              {[
                "JSON fields must be serialized in lexicographic key order",
                "No whitespace between tokens (compact form)",
                "String encoding: UTF-8",
                "Numbers: integer representation, no trailing zeros",
                "Boolean: true / false lowercase",
                "Signed byte sequence: canonical(header) || canonical(metadata) || payload_bytes",
                "No length prefix or delimiter added between sections at the outer level",
              ].map((p) => <li key={p} className="flex gap-3"><span className="text-[#00FF88]">→</span>{p}</li>)}
            </ul>
            <p className="mt-4 text-white/40 text-xs">Implementations must produce identical byte sequences for identical logical containers. Any deviation in serialization invalidates the signature.</p>
          </Section>
          <Section num="20" title="Key Trust Model">
            Each container declares a key_id in the metadata. The key_id is derived from the PQC public key
            using SHA-256(public_key_bytes).hex(). The key_id is a stable identifier, not a trust source.
            Trust is established by locating the corresponding public key in the Foritech Device Registry
            and performing ML-DSA-65 signature verification.
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                ["ACTIVE", "accepted for verification", "#00FF88"],
                ["REVOKED", "rejected — containers signed with this key are rejected", "#ef4444"],
                ["EXPIRED", "rejected by policy after TTL", "#facc15"],
              ].map(([state, desc, color]) => (
                <div key={state} className="border border-white/10 p-4">
                  <div className="text-xs font-bold mb-1" style={{color}}>{state}</div>
                  <div className="text-xs text-white/40">{desc}</div>
                </div>
              ))}
            </div>
          </Section>
          <Section num="21" title="Status">
            <div className="border border-yellow-400/20 bg-yellow-400/5 p-4 mt-2">
              <div className="text-xs text-[#00FF88] tracking-wider mb-2">IANA REGISTERED</div>
              <p>This specification is registered with IANA under media type <span className="text-[#00FF88]">application/vnd.foritech.container</span> (2026-04-15). IANA Private Enterprise Number: 65385.</p>
            </div>
          </Section>
        </div>
        <div className="mt-24 pt-8 border-t border-white/5 flex justify-between">
          <div className="text-xs text-white/20">© 2026 Foritech — Protocol Specification v1.0-draft</div>
          <a href="/" className="text-xs text-white/30 hover:text-white/60 transition-colors">← Back to foritech.bg</a>
        </div>
      </div>
    </main>
  );
}

function Section({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-baseline gap-4 mb-4">
        <span className="text-3xl font-bold text-white/10">{num}</span>
        <h2 className="text-xl font-bold text-white/90">{title}</h2>
      </div>
      <div className="pl-12">{children}</div>
    </section>
  );
}
