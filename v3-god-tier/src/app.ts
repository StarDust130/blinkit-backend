import express from "express";
import { logger } from "./infrastructure/logger/index.js";

const app = express();
app.use(express.json());

logger.info("Server started");
logger.error(Error);

// Register middleware, routes, and other setup here

export default app;
