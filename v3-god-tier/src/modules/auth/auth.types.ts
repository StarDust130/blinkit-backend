
import { z } from "zod";

import { loginSchema, registerSchema } from "./auth.schema.js";

// 🧠 Register input type
export type RegisterInput = z.infer<typeof registerSchema>;

// 🧠 Login input type
export type LoginInput = z.infer<typeof loginSchema>;
