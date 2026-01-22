import express from "express";
import { InMemoryLedger, Transaction } from "./ledger.js";

const app = express();
app.use(express.json());

const PORT = process.env.PORT ? Number(process.env.PORT) : 8080;

/**
 * In-memory state (NON production)
 */
const ledger = new InMemoryLedger();

type Wallet = {
  id: string;
  balance: number;
};

const wallets: Record<string, Wallet> = {};

const services = [
  { id: "compute.basic", price: 1 },
  { id: "data.access", price: 0.5 }
];

/**
 * Health
 */
app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "mindchain-reference",
    status: "non-production"
  });
});

/**
 * Services
 */
app.get("/services", (_req, res) => {
  res.json({ services });
});

/**
 * Wallets
 */
app.post("/wallets", (req, res) => {
  const id = `w_${Math.random().toString(16).slice(2)}_${Date.now()}`;
  const balance = typeof req.body?.balance === "number" ? req.body.balance : 10;

  wallets[id] = { id, balance };

  res.status(201).json(wallets[id]);
});

/**
 * Transactions
 */
app.post("/tx", (req, res) => {
  const { from, to, amount } = req.body ?? {};

  if (!from || !to || typeof amount !== "number") {
    return res.status(400).json({ error: "Invalid transaction payload" });
  }

  if (!wallets[from] || !wallets[to]) {
    return res.status(404).json({ error: "Wallet not found" });
  }

  if (wallets[from].balance < amount) {
    return res.status(400).json({ error: "Insufficient balance" });
  }

  wallets[from].balance -= amount;
  wallets[to].balance += amount;

  const tx: Transaction = {
    id: `tx_${Math.random().toString(16).slice(2)}_${Date.now()}`,
    from,
    to,
    amount,
    timestamp: Date.now()
  };

  ledger.record(tx);

  res.status(201).json({ status: "recorded", tx });
});

/**
 * Ledger
 */
app.get("/ledger", (_req, res) => {
  res.json({ transactions: ledger.list() });
});

/**
 * Settlement (stub)
 */
app.post("/settle", (_req, res) => {
  res.json({
    status: "settlement stub executed",
    transactions: ledger.list().length
  });
});

app.listen(PORT, () => {
  console.log(`[mindchain-reference] running on http://localhost:${PORT}`);
});
