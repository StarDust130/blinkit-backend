import { Request, Response, NextFunction } from "express";
import { ZodObject } from "zod";

//! We validate the data from user 🤭
export const validate = (schema: ZodObject<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Test the incoming request against the Zod shield
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next(); // If it passes, let them through to the Controller
    } catch (error: any) {
      // If Zod catches bad data, throw a 400 Bad Request error to our Janitor
      res.status(400).json({
        status: "error",
        message: "❌ Validation Failed 😭",
        errors: error.errors,
      });
    }
  };
};
