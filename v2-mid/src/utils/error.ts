import { Request, Response, NextFunction } from "express";

// Express knows this is the Global Error Handler because it has 4 parameters (err, req, res, next)
export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error("🔥 SYSTEM ERROR:", err);

  const statusCode = err.statusCode || 500;

  const isProd = process.env.NODE_ENV === "production";

  const message =
    isProd && statusCode === 500 ? "Something went wrong" : err.message;

  res.status(statusCode).json({
    status: "error",
    message,
  });
};