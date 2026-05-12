import { NextFunction, Request, Response } from "express";

import { ZodSchema } from "zod";

// ✅ Validate request body using Zod
export const validateRequest =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    // ❌ Validation failed
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error.issues[0]?.message,
      });
    }

    next();
  };

