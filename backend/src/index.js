import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.config.js";
import authRoute from "./routes/auth.route.js";
import chatRoute from "./routes/chat.route.js"
import cors from "cors";
import { connectRedis } from "./config/redis.config.js";

dotenv.config();

import { app, server } from "./config/socket.config.js";

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Debug middleware to log request body issues
app.use((req, res, next) => {
  if (req.path === "/api/auth/update-profile") {
    console.log("--- Update Profile Request Debug ---");
    console.log("Method:", req.method);
    console.log("Content-Type:", req.headers["content-type"]);
    console.log("Body exists:", !!req.body);
    console.log("-------------------------------------");
  }
  next();
});
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// API routes
app.use("/api/auth", authRoute);
app.use("/api/chat", chatRoute)

// Health check route
app.get("/", (req, res) => {
  res.send("EduSync backend is running ✅");
});

const port = process.env.PORT || 5001;

server.listen(port, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || "development"} mode on port: ${port}`);
});

connectDB()

  .then(async () => {
    await connectRedis();
    console.log("✅ Database connected successfully");
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  });
