# Architecture (Conceptual)

Mindchain is a **native payment rail** for AI-to-AI and machine-to-machine (M2M) transactions.  
This document describes the **conceptual architecture**, module boundaries, and the intended division between **off-chain execution** and **settlement**.

## Design Principles
- **Rail, not a marketplace**: Mindchain provides value transfer and settlement primitives, not service discovery or service marketplaces.
- **Agent-native**: wallets and policies are designed for autonomous execution.
- **Off-chain first**: low-latency interactions occur off-chain; settlement is periodic or event-driven.
- **Minimal trust**: auditable logs and verifiable intents; avoid opaque platform lock-in.
- **Non-production reference**: the `/reference` folder is a feasibility skeleton, not secure software.

## High-Level Modules

### 1) Agent Wallet
A wallet instance bound to an AI agent or device.
- Maintains balance (service credits / settlement units)
- Enforces spending policy (limits, allowlists, expiry)
- Signs payment intents (conceptually)

### 2) Service Registry
A catalog of purchasable services (API calls, compute, data, tasks).
- Fixed or dynamic pricing
- Service identifiers and metadata
- Optional: service provider identity / attestations

### 3) Transaction / Intent Layer (Off-chain)
The off-chain flow where agents:
- request services
- negotiate price (optional)
- produce signed intents
- exchange receipts / acknowledgements

### 4) Ledger & Audit Log
A record of executed transfers and receipts.
- Append-only log semantics (conceptually)
- Supports monitoring, dispute analysis, and accounting
- In `/reference`: in-memory only

### 5) Settlement Engine
Periodically (or on thresholds) settles net balances.
- Could settle on-chain, via traditional rails, or via internal credit clearing
- In `/reference`: a stub endpoint to demonstrate boundaries

## Off-chain vs Settlement (Conceptual Boundary)

### Off-chain (fast path)
- Micropayments / per-call billing
- Agent-to-agent intents and acknowledgements
- Rate-limits, expiry, replay protection (conceptually)

### Settlement (slow path)
- Netting and reconciliation
- Final settlement on a chosen backend:
  - on-chain (public or permissioned)
  - off-chain clearing
  - fiat rails / stable settlement instruments
- Governance and compliance constraints (future scope)

## What This Repo Contains
- **README.md**: conceptual scope, positioning, prior art
- **/docs/position-paper.md**: conceptual framework (v1.1)
- **/reference**: minimal non-production skeleton showing feasibility

## What This Repo Does Not Contain (By Design)
- production security hardening
- key management, secure signing, enclaves/HSM integration
- persistence, databases, reliability engineering
- compliance flows, KYC/AML constraints (jurisdiction-dependent)
- token issuance, DeFi, exchanges, speculative markets
