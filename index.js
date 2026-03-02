require("dotenv").config();

const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const { Client } = require("pg");

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// PostgreSQL Connection
const client = new Client({
  user: "postgres",
  host: "db.sovidyzcxxflwzwpaevr.supabase.co",
  database: "postgres",
  password: "It9k9TSnYhg8A01n",
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect()
  .then(() => console.log("✅ Postgres Connected"))
  .catch(err => console.error("❌ Connection error", err));

// Rate limiter
const aiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
  message: {
    ok: false,
    message: "Too many requests. Try again later."
  }
});

// Routes
const generateRoute = require("./routes/generate");

app.use("/api/generate", aiLimiter);
app.use("/api", generateRoute);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Start server (ONLY ONCE)
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});