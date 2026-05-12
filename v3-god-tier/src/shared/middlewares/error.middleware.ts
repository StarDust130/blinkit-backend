import {  Request, Response } from "express";

import { AppError } from "../errors/app-error.js";

// 🚨 Global error handler
export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
) => {
  // ⚡ Custom app error
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  // 💥 Unknown server error
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};

