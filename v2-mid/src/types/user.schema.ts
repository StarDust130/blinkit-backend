import { z } from "zod";

export const userSchema = z
  .object({
    body: z.object({
    // 👤 Name: trimmed, readable, safe characters only
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be at most 50 characters")
      .regex(/^[A-Za-z .'-]+$/, "Name contains invalid characters"),

    // 📧 Email: normalized + valid format
    email: z
      .string()
      .trim()
      .toLowerCase()
      .pipe(z.email({ message: "Invalid email address" })),

    // 📱 Phone: E.164 style (10-15 digits, optional +)
    phone: z
      .string()
      .min(10)
      .trim()
      .regex(/^\+?[1-9]\d{9,14}$/, "Invalid phone number format"),
  })
  })
