import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

// 1️⃣) Create the physical connection pipeline using the standard 'pg' driver
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });

// 2️⃣) Wrap the pool in the Prisma 7 Adapter
const adapter = new PrismaPg(pool);

// 3️⃣) Global declaration for development hot-reloading
declare global {
  var prisma: PrismaClient | undefined;
}

// 4️⃣) Inject the adapter into the Prisma engine
const prisma =
  global.prisma ||
  new PrismaClient({
    adapter, // ⬅️ THIS IS THE CRITICAL PRISMA 7 REQUIREMENT
    log: ["warn", "error"],
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default prisma;
