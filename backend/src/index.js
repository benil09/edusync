import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.config.js";
import authRoute from "./routes/auth.route.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // ✅ allow frontend origin
    credentials: true, // ✅ allow cookies
  })
);

// API routes
app.use("/api/auth", authRoute);

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log("server started on port :", port);
});

connectDB();
