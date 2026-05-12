
import { Response } from "express";

// 📦 Standard API response format
export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data?: T
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};
