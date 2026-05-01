import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { Prisma } from "@prisma/client";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let error = { ...err };
  error.message = err.message;

  // 🛑 Catch Prisma Unique Constraint Error (Duplicate Email/Phone)
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      // Find out which field caused the duplicate (email or phone)
      const target = err.meta?.target as string[];
      const field = target ? target[0] : "Field";
      error = new AppError(
        `This ${field} is already registered. Please use another.`,
        400,
      );
    }
  }

  // 🎯 Default Error Format
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};
