# Threat Model (Conceptual)

This document outlines a high-level threat model for an AI-native payment rail.

> Note: `/reference` is non-production and does **not** implement full mitigations.  
> This document describes what a production system must address.

## Threats

### 1) Replay Attacks
**Threat:** An attacker re-submits a valid intent multiple times.  
**Mitigations:** nonce tracking, idempotency keys, expiry windows, ledger deduplication.

### 2) Spoofed Agent Identity
**Threat:** A malicious actor impersonates an agent/wallet.  
**Mitigations:** strong key management, authenticated identities, hardware-backed keys, attestations.

### 3) Payload Tampering
**Threat:** Intent fields are modified in transit.  
**Mitigations:** signing, canonical serialization, integrity checks.

### 4) Double Spend / Balance Desync
**Threat:** Concurrent submissions cause inconsistent balances.  
**Mitigations:** atomic state transitions, concurrency control, deterministic ordering, reconciliation.

### 5) Denial of Service (DoS)
**Threat:** Flooding endpoints with requests.  
**Mitigations:** rate-limiting, quotas, circuit breakers, WAF, backpressure.

### 6) Price Manipulation / Quote Abuse
**Threat:** Providers publish misleading quotes or bait-and-switch.  
**Mitigations:** quote expiry, signed quotes, transparency rules, dispute workflows.

### 7) Data Leakage
**Threat:** Sensitive metadata leaks via logs.  
**Mitigations:** minimize logs, redact identifiers, encrypt at rest, access control.

## Security Posture (Phased)
- MVP / reference: feasibility only, no guarantees
- Pilot: secure key management, nonce+expiry, rate-limits, persistence
- Production: audits, formal verification targets, incident response, disclosure policy
