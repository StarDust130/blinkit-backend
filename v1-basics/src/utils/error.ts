import { Request, Response, NextFunction } from "express";

// Express knows this is the Global Error Handler because it has 4 parameters (err, req, res, next)
export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error("🔥 SYSTEM ERROR:", err.message);

  // If we didn't specify a status code, default to 500 (Server Exploded)
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
};
