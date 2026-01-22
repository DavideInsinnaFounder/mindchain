# Payments Flow (Conceptual)

This document describes the conceptual payment flow for Mindchain as a **rail** for AI-to-AI and M2M transactions.

## Entities
- **Agent A**: payer (wallet owner)
- **Agent B**: payee/service provider (wallet owner)
- **Service Registry**: service metadata + pricing
- **Ledger/Audit Log**: records executed transactions
- **Settlement Engine**: netting + reconciliation (slow path)

## Flow Overview (Off-chain First)

### Step 0 — Discovery (optional)
Agent A discovers:
- service id
- pricing model
- provider identity (optional)

### Step 1 — Quote / Price (optional)
Agent B returns a quote:
- amount
- expiry time
- service parameters

### Step 2 — Intent Creation (payer)
Agent A creates a **payment intent**:
- from, to
- amount
- expiry
- nonce (anti-replay)
- service id (optional)
- policy checks (limits/allowlist)

### Step 3 — Intent Submission (rail)
Agent A submits intent to the rail (or directly to provider, depending on mode).
The rail validates:
- intent structure
- policy rules (conceptually)
- expiry / nonce constraints (conceptually)

### Step 4 — Service Delivery (provider)
Agent B delivers service output:
- API response / compute result / data payload
- receipt reference (optional)

### Step 5 — Receipt & Logging
The system records:
- executed transfer
- receipt metadata (optional)
- audit log entry

### Step 6 — Settlement (slow path)
Periodically:
- net balances are reconciled
- final settlement occurs on chosen backend

## Minimal Demo Flow (Reference Skeleton)
In `/reference`:
1) Create two wallets (`POST /wallets`)
2) Submit a transaction (`POST /tx`)
3) Verify audit log (`GET /ledger`)
4) Call settlement stub (`POST /settle`)

> The reference flow is **not secure**, **not persistent**, and intended solely to show feasibility and module boundaries.
