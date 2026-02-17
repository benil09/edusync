import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.config.js";
import authRoute from "./routes/auth.route.js";
import cors from "cors";
import { connectRedis } from "./config/redis.config.js";

dotenv.config();

const app = express();
app.use(express.json({limit:"10mb"}));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// API routes
app.use("/api/auth", authRoute);

// Health check route
app.get("/", (req, res) => {
  res.send("EduSync backend is running ✅");
});

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || "development"} mode on port: ${port}`);
});

connectDB()

  .then(() => {
    console.log("✅ Database connected successfully");
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  });
