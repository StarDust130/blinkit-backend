import { Pool } from "pg";
import { env } from "./env"; 


// Create the pool of 'Chefs' ready to talk to the PostgreSQL Fridge
const pool = new Pool({
  user: env.DB_USER, // ⬅️ Safe, validated, autocompleted by TypeScript
  password: env.DB_PASSWORD, // ⬅️ Safe
  host: env.DB_HOST, // ⬅️ Safe
  database: env.DB_NAME, // ⬅️ Safe
  port: env.DB_PORT, // ⬅️ Safe AND already converted to a Number by Zod
});

export const connectDB = async (): Promise<void> => {
  console.log("🍄 Checking DB Port:", env.DB_PORT);
  try {
    const client = await pool.connect();
    console.log("✅ PostgreSQL DB Connected Successfully");
    client.release();
  } catch (error) {
    console.error("❌ Database Connection Failed:", error);
    process.exit(1);
  }
};

export default pool;
