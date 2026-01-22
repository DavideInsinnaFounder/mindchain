# Mindchain — Reference Skeleton (Non-Production)

This folder contains a **non-production, non-secure reference skeleton**
intended to demonstrate that the Mindchain conceptual MVP can be mapped into
code structure.

## Scope
- AI Wallet (policy-based spending)
- Lightweight ledger (in-memory)
- Service registry (in-memory)
- Settlement engine (periodic settlement stub)
- Minimal API gateway (Express)
- Simple transaction simulator

## Non-Goals
- No security hardening
- No real cryptography / key management
- No persistence / database
- No off-chain / on-chain settlement
- No token issuance or marketplace

## Run (local)
```bash
cd reference
npm install
npm run dev
```
## Endpoints
- `GET /health`
- `GET /services`
- `POST /wallets` — create wallet
- `POST /tx` — submit transaction
- `GET /ledger` — list recorded transactions
- `POST /settle` — run settlement stub

## Disclaimer
This reference implementation is **non-production**, **non-secure**, and
intended solely to demonstrate architectural feasibility.

