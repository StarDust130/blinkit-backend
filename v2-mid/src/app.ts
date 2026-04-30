import express from "express";
import { globalErrorHandler } from "./utils/error";
import storeRouters from "./routes/store.routes"
import { requestIdMiddleware } from "./middleware/requestIdMiddleware";



const app = express();

// Core middleware 🌟
app.use(express.json());

//! 🔥 Custom middleware (IMPORTANT: before routes)
app.use(requestIdMiddleware);

//---------------------------
// 📝 Log every incoming request (method + URL + requestId)
app.use((req, res, next) => {
  console.log(`🤓 [${(req as any).requestId}] ${req.method} ${req.url}`);
  next();
});


//----------------------------

//! Routes 📍
app.use("/api/v2/stores" , storeRouters)



//🐞🐞 --- ERROR HANDLING (Must be at the bottom!) 🐞🐞 ---
app.use(globalErrorHandler); // ⬅️ The Janitor waits here for any thrown errors

export default app