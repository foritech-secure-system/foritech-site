# Foritech Protocol Specification

Version: 1.0-draft  
Status: Experimental  
Media Type: application/vnd.foritech.container  
File Extension: .ftech  
Encoding: binary

This document defines the signed binary container format and verification model
used by Foritech Secure System.

Foritech Secure System is a cryptographic verification platform for telemetry
and machine data. It acts like a digital notary, proving where data came from
and whether it was altered.

---

# 1. Purpose

The Foritech protocol enables cryptographic verification of:

- telemetry
- machine-generated data
- files
- edge-to-cloud integrity records
- signed industrial or IoT payloads

The protocol is designed to provide:

- authenticity
- integrity
- tamper evidence
- deterministic verification results
- audit-ready verification behavior

---

# 2. Design Principles

The protocol follows these principles:

- never trust data before cryptographic verification
- all security-relevant metadata must be covered by the signature
- malformed containers must be rejected
- verification results must be deterministic
- policy enforcement must be separated from parsing and signature verification

Incoming containers must always be treated as untrusted until verification
succeeds.

---

# 3. Container Model

A Foritech container is a signed binary container that encapsulates four
logical components:

1. Header
2. Metadata
3. Payload
4. Signature

Logical structure:

Header  
Metadata  
Payload  
Signature

The container binds metadata and payload into a single signed verification unit.

---

# 4. Header

The header identifies the container format and protocol version.

Typical header fields include:

- magic
- version
- algorithm
- content type indicator
- container profile identifier

Example logical values:

- magic: "foritech"
- version: 1
- algorithm: ML-DSA

The header is part of the signed material and must be protected by the
signature.

---

# 5. Metadata

Metadata contains the fields required to interpret and validate the container.

Typical metadata fields include:

- device_id
- timestamp
- key_id
- nonce

Example logical values:

- device_id: device-001
- timestamp: 1710000000
- key_id: device-key-1
- nonce: random-value

All metadata affecting trust, verification, interpretation, routing, or replay
handling must be covered by the signature.

Unsigned metadata must not influence trust decisions.

---

# 6. Payload

The payload contains the actual data carried by the container.

Examples include:

- telemetry samples
- machine status data
- file contents
- signed event records
- industrial protocol output

The payload is treated as opaque data by the core verification engine.

Interpretation of payload semantics is outside the scope of the core container
verification logic.

---

# 7. Signature

The signature provides authenticity and integrity protection for the container.

The signature must cover:

- header
- metadata
- payload

Any modification to these components must invalidate the container.

## Supported Signature Algorithm

Primary signature algorithm:

- ML-DSA

For the current Foritech protocol line, the protocol is defined as PQC-first.
Classical signature schemes are not part of the normative protocol definition.

---

# 8. Container Creation

A container is generated using the following logical process:

1. Construct header
2. Construct metadata
3. Attach payload
4. Generate signature over header + metadata + payload
5. Append signature
6. Serialize as a binary `.ftech` container

The resulting container becomes the atomic signed object exchanged between
systems.

---

# 9. Container Verification

Verification is performed using the following logical process:

1. Parse header
2. Validate container structure
3. Parse metadata
4. Load verification key
5. Verify signature
6. Return verification result

A container must be accepted only if:

- the structure is valid
- the required fields are present
- the signature is valid
- the container is not malformed

---

# 10. Verification Output

Verification produces one of two results:

- VERIFIED
- REJECTED

No partial trust state is permitted.

The core verification layer does not produce policy-dependent “soft success”
states.

---

# 11. Core Verification vs Service-Layer Policy

The Foritech protocol separates cryptographic verification from operational
policy enforcement.

## Core verification is responsible for:

- parsing the container
- validating required structure
- loading the verification key
- verifying the signature
- producing VERIFIED or REJECTED

## Service-layer policy may enforce:

- replay protection
- timestamp freshness windows
- trust policy
- key lifecycle policy
- device allowlists or deny-lists
- audit logging
- deployment-specific acceptance rules

This separation ensures that the core verification engine remains deterministic,
portable, and dependency-light.

---

# 12. Replay Protection

Replay protection is not guaranteed by the media type or by signature validity
alone.

Replay mitigation may use:

- timestamp validation
- nonce tracking
- device identity tracking
- service-side replay caches
- trust policy rules

Replay protection should be enforced by the consuming verification service or
platform layer.

---

# 13. Security Requirements

A compliant implementation must enforce the following requirements:

- strict parsing rules
- explicit signature verification
- deterministic verification behavior
- rejection of malformed containers
- rejection of altered signed content
- rejection of incomplete or structurally invalid containers

Additionally:

- all trust-relevant metadata must be included in the signed material
- unsigned metadata must not influence trust decisions
- implementations must treat all inputs as untrusted before verification
- implementations should fail closed on parsing or signature errors

---

# 14. Interoperability

Interoperability depends on:

- a shared container specification
- deterministic serialization and parsing
- agreement on the protocol version
- agreement on metadata semantics
- agreement on the signature algorithm and key handling model

Payload interpretation may vary by application, but signature coverage and
verification behavior must remain consistent.

---

# 15. Media Type Registration Intent

The Foritech container format is intended to be identified as:

- Media Type: `application/vnd.foritech.container`
- File Extension: `.ftech`

This media type identifies a signed binary container used by Foritech Secure
System for telemetry and machine-data verification workflows.

---

# 16. Verification Philosophy

The Foritech protocol follows one core rule:

"Never trust data without cryptographic verification."

A container is either verified or rejected.

No data should be treated as trusted solely because it is well-formed,
delivered by a known transport, or associated with a known source unless
cryptographic verification succeeds.

---

# 17. Status

This specification is currently experimental and subject to controlled
evolution under the Foritech Secure System architecture and governance model.
