import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  // 1️⃣ THE BLUEPRINT: Tells the Prisma CLI where to find your table structures
  schema: "prisma/schema.prisma",

  // 2️⃣ THE HISTORY: Explicitly defines where to save the generated SQL migration files
  migrations: {
    path: "prisma/migrations",
  },

  // 3️⃣ THE VAULT KEY: Injects the secure Database URL securely from your .env file
  datasource: {
    url: env("DATABASE_URL"),
  },
});
