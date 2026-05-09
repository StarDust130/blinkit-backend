import { Request, Response } from "express";

type AppError = Error & {
  statusCode?: number;
};

export const errorMiddleware = (
  err: AppError,
  _req: Request,
  res: Response,
) => {
  const statusCode = err.statusCode ?? 500;

  res.status(statusCode).json({
    success: false,
    message:
      process.env.NODE_ENV === "production" && statusCode === 500
        ? "Internal Server Error 😭"
        : err.message,
  });
};
