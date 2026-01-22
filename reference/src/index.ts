import express from "express";
import { InMemoryLedger } from "./ledger.js";

const app = express();
app.use(express.json());

const PORT = process.env.PORT ? Number(process.env.PORT) : 8080;

const ledger = new InMemoryLedger();

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "mindchain-reference", status: "non-production" });
});

app.get("/ledger", (_req, res) => {
  res.json({ transactions: ledger.list() });
});

app.post("/tx", (req, res) => {
  const { from, to, amount } = req.body ?? {};
  if (!from || !to || typeof amount !== "number") {
    return res.status(400).json({ error: "Expected JSON body: { from, to, amount:number }" });
  }

  ledger.record({
    id: `tx_${Math.random().toString(16).slice(2)}_${Date.now()}`,
    from,
    to,
    amount,
    timestamp: Date.now()
  });

  return res.status(201).json({ status: "recorded" });
});

app.listen(PORT, () => {
  console.log(`[mindchain-reference] running on http://localhost:${PORT}`);
});
