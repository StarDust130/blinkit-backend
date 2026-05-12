
import {  Request, Response } from "express";

import { AppError } from "../shared/errors/app-error.js";
import { handlePrismaError } from "../shared/errors/handle-prisma-error.js";

// 🚨 Global error handler
export const errorMiddleware = (
  error: unknown,
  req: Request,
  res: Response,
) => {
  console.error(error);

  // ⚡ Transform Prisma errors
  if (!(error instanceof AppError)) {
    error = handlePrismaError(error);
  }

  // ✅ Safe app error response
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  // 💥 Final fallback
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};

