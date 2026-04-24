import "dotenv/config";
import express, { Application } from "express";
import { connectDB } from "./config/db"; // fixed: remove .js so ts-node resolves the .ts module
import storeRoutes from "./routes/store.routes";
import { globalErrorHandler } from "./utils/error";


const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse incoming JSON data (The Waiter reading the ticket)
app.use(express.json());

//! Routes 📍
app.use("/api/v1/stores", storeRoutes );

//🐞🐞 --- ERROR HANDLING (Must be at the bottom!) 🐞🐞 ---
app.use(globalErrorHandler); // ⬅️ The Janitor waits here for any thrown errors

// Start the sequence: DB first, Server second
const startServer = async () => {
  await connectDB(); // If this fails, the app dies before opening the port

  app.listen(PORT, () => {
    console.log(`🚀 Blinkit API running on port ${PORT}`);
  });
};

startServer();
