import { Prisma } from "@/generated/prisma/client.js";

import { AppError } from "./app-error.js";

// 🛠️ Convert Prisma errors → clean app errors
export const handlePrismaError = (error: unknown) => {
  // 🔒 Unique constraint failed
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  ) {
    return new AppError("Email or phone already exists", 400);
  }

  // 💥 Fallback unknown DB error
  return new AppError("Database Error", 500);
};

