// === Load Environment Variable ===
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler.js";
import moodRoutes from "./routes/mood.js";
import journalRoutes from "./routes/journal.js";
import authRoutes from "./routes/auth.js";
import consultationRoutes from "./routes/consultation.js";
import psychologistRoutes from "./routes/psychologist.js";
import passport from './config/passport.js';
import { requestLogger } from "./middlewares/requestLogger.js";

dotenv.config();

// === Debug Check ===
console.log("📦 Loaded ENV Variables:");
console.log("PORT:", process.env.PORT);
console.log("MONGO_URI:", process.env.MONGO_URI ? "[OK]" : "[MISSING]");

// === Express App ===
const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173" }));
app.use(express.json());
app.use(passport.initialize());
app.use(requestLogger);

// === Connect MongoDB ===
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error("❌ MONGO_URI tidak ditemukan di .env!");
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });

// === Routes ===
app.get("/", (req, res) => {
  res.json({ success: true, message: "Mahasigmind API is running..." });
});

app.use("/api/auth", authRoutes);
app.use("/api/moods", moodRoutes);
app.use("/api/journals", journalRoutes);
app.use("/api/consultations", consultationRoutes);
app.use("/api/psychologist", psychologistRoutes);

// Error Handler
app.use(errorHandler);

// === Start Server ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));