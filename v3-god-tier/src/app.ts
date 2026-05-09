import express from "express";
import cors from "cors";
import helmet from "helmet";
import { logger } from "./infrastructure/logger/index.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();
app.use(express.json());


app.use(cors());
app.use(helmet());

logger.info("Server started");
logger.error(Error);


app.get("/", (req, res) => {
  res.json({
    success: true,
  });
});

// Register middleware, routes, and other setup here

//! ERROR middleware
app.use(errorMiddleware);

export default app;
