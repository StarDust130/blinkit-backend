import { Request, Response } from "express";

type SendResponseArgs<T = unknown> = {
  res: Response;
  statusCode?: number;
  message?: string;
  data?: T;
  req: Request; 
};

export const sendResponse = <T = unknown>({
  res,
  statusCode = 200,
  message,
  data,
  req,
}: SendResponseArgs<T>) => {
  const isError = statusCode >= 400;

  return res.status(statusCode).json({
    status: isError ? "error" : "success",
    message,
    ...(isError ? {} : { data }), // don’t send data on errors
    meta: {
      requestId: req.headers["x-request-id"] ?? null, // 🆔 trace id
      timestamp: Date.now(), // fast + standard
    },
  });
};
