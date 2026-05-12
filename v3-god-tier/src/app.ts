import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { errorMiddleware } from "./shared/middlewares/error.middleware.js";

const app = express();

// 🛡️ Secure HTTP headers
app.use(helmet());

// 🌍 Enable frontend/backend communication
app.use(cors());

// 📦 Parse JSON request body
app.use(express.json());

// 📝 HTTP request logger
app.use(morgan("dev"));

// ❤️ Health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Server is running",
  });
});

// 🚨 Global error middleware (always LAST)
app.use(errorMiddleware);

export default app;

