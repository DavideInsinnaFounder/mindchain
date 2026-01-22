import express from "express";

const app = express();
app.use(express.json());

const PORT = process.env.PORT ? Number(process.env.PORT) : 8080;

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "mindchain-reference",
    status: "non-production"
  });
});

app.listen(PORT, () => {
  console.log(`[mindchain-reference] running on http://localhost:${PORT}`);
});
