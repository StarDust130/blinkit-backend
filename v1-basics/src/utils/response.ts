import { Request, Response } from "express";

// 🎯 Allowed status codes only
type AllowedStatusCode =
  | 200 // OK
  | 201 // Created
  | 202 // Accepted
  | 204 // No Content
  | 206 // Partial Content
  | 400 // Bad Request
  | 401 // Unauthorized
  | 402 // Payment Required
  | 403 // Forbidden
  | 404 // Not Found
  | 405 // Method Not Allowed
  | 406 // Not Acceptable
  | 408 // Request Timeout
  | 409 // Conflict
  | 410 // Gone
  | 412 // Precondition Failed
  | 413 // Payload Too Large
  | 415 // Unsupported Media Type
  | 422 // Unprocessable Entity
  | 429 // Too Many Requests
  | 500 // Internal Server Error
  | 501 // Not Implemented
  | 502 // Bad Gateway
  | 503 // Service Unavailable
  | 504; // Gateway Timeout

type SendResponseArgs = {
  req: Request;
  res: Response;
  statusCode?: AllowedStatusCode;
  message?: string;
  data?: unknown;
};

export const sendResponse = ({
  req,
  res,
  statusCode = 200, // ✅ default
  message,
  data,
}: SendResponseArgs) => {
  return res.status(statusCode).json({
    status: "success",
    message,
    data,
    meta: {
      timestamp: new Date().toISOString(), // 🕒 response time
      requestId: req.headers["x-request-id"] ?? null, // 🆔 trace id
    },
  });
};
