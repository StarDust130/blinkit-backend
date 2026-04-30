import express from "express";
import { globalErrorHandler } from "./utils/error";



const app = express();

// Core middleware 🌟
app.use(express.json());

//! 🔥 Custom middleware (IMPORTANT: before routes)
// app.use(requestIdMiddleware);

//---------------------------
// 📝 Log every incoming request (method + URL + requestId)
app.use((req, res, next) => {
  console.log(
    `🤓 [${req.headers["x-request-id"]}] ${req.method} ${req.url}`
  );
  next();
});


//----------------------------



//🐞🐞 --- ERROR HANDLING (Must be at the bottom!) 🐞🐞 ---
app.use(globalErrorHandler); // ⬅️ The Janitor waits here for any thrown errors

export default app