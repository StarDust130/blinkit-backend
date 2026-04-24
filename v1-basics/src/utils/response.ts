import { Request, Response } from "express";

export const sendResponse = ({
  req,
  res,
  statusCode = 200,
  message,
  data,
}: {
  req: Request;
  res: Response;
  statusCode?: number;
  message?: string;
  data?: any;
}) => {
  return res.status(statusCode).json({
    status: "success",
    message,
    data,
    meta: {
      timestamp: new Date().toISOString(),
      requestId: req.headers["x-request-id"] ?? null,
    },
  });
};
