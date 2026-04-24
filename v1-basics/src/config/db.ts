import { Pool } from "pg";
import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();


// Create the pool of 'Chefs' ready to talk to the PostgreSQL Fridge
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 5432,
});

// A helper function to test the connection when the server starts
export const connectDB = async (): Promise<void> => {
    console.log("🍄 Checking DB Port:", process.env.DB_PORT);
  try {
    const client = await pool.connect();
    console.log("✅ PostgreSQL DB Connected Successfully ");
    client.release(); // Put the connection back in the pool so others can use it
  } catch (error) {
    console.error("❌ Database Connection Failed:", error);
    process.exit(1); // Kill the server completely if the DB is down. No DB = No App.
  }
};

export default pool;
