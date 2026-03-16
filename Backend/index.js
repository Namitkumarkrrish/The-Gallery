const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Routes
const authRoutes = require("./routes/authRoutes");
const memoryRoutes = require("./routes/memoryRoutes");

const app = express();

/* ========================
   CORS CONFIGURATION
======================== */

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://the-gallery-blush.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

/* ========================
   MIDDLEWARE
======================== */

app.use(express.json());

/* ========================
   DATABASE CONNECTION
======================== */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Database Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

/* ========================
   API ROUTES
======================== */

app.use("/api/auth", authRoutes);
app.use("/api/memories", memoryRoutes);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

/* ========================
   SERVER
======================== */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server flying on port ${PORT}`);
});