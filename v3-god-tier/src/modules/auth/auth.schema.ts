
import { z } from "zod";

// 📧 Email/password register validation
export const registerSchema = z.object({
  name: z.string().min(2, "Name too short"),

  email: z.email("Invalid email"),

  phone: z.string().min(10, "Invalid phone"),

  password: z.string().min(6, "Password must be at least 6 characters"),
});

// 🔐 Login validation
export const loginSchema = z.object({
  email: z.email("Invalid email"),

  password: z.string().min(6, "Password required"),
});

