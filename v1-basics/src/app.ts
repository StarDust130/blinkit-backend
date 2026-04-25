import express from "express";
import storeRoutes from "./routes/store.routes";
import productRoutes from "./routes/product.routes"
import inventorytRoutes from "./routes/inventory.routes";

import { globalErrorHandler } from "./utils/error";
import { requestIdMiddleware } from "./middleware/requestId";

const app = express();

// Core middleware
app.use(express.json());

//! 🔥 Custom middleware (IMPORTANT: before routes)
app.use(requestIdMiddleware);

//---------------------------
// 📝 Log every incoming request (method + URL + requestId)
app.use((req, res, next) => {
  console.log(
    `🤓 [${req.headers["x-request-id"]}] ${req.method} ${req.url}`
  );
  next();
});


//----------------------------

//! Routes 📍
app.use("/api/v1/stores", storeRoutes );
app.use("/api/v1/products", productRoutes ); 
app.use("/api/v1/inventory", inventorytRoutes); 

//🐞🐞 --- ERROR HANDLING (Must be at the bottom!) 🐞🐞 ---
app.use(globalErrorHandler); // ⬅️ The Janitor waits here for any thrown errors

export default app;
