import { PrismaClient } from "@prisma/client";

// 1️⃣) 🧩 Tell TypeScript that the global object might have a Prisma instance
declare global {
  var prisma: PrismaClient | undefined;
}

// 2️⃣) 🔌 Create the engine or reuse the existing one
// We turn on logging for errors and warnings so you see if a query fails
const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["warn", "error"],
  });

// 3️⃣) 🛡️ The Development Shield
// If we are NOT in production (meaning we are using nodemon), save the engine globally.
// This stops nodemon from opening 500 database connections every time you hit Save.
if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

// 4️⃣) 📤 Export this single, safe instance to use in all controllers
export default prisma;
