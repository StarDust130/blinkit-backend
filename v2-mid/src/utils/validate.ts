import { Request, Response, NextFunction } from "express";
import { ZodObject } from "zod";

//! We validate the data from user 🤭
export const validate = (schema: ZodObject<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // 1️⃣ Collect request data from body, query, and params
    const result = await schema.safeParseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    // 2️⃣ If validation passes, move to the next middleware
    if (result.success) {
      return next();
    }

    // 3️⃣ Format validation errors into a simple list
    const errors = result.error.issues.map((issue) => ({
      field: issue.path.join(".") || "unknown",
      message: issue.message,
    }));

    // 4️⃣ Send a clear 400 response when validation fails
    return res.status(400).json({
      status: "error",
      message: "⚠️ 😭 Validation failed. Please fix the highlighted fields.",
      errors,
    });
  };
};
