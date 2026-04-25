import { Request, Response } from "express";
import pool from "../config/db";
import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/response";

//! Create Store - POST /api/v1/stores 🚀
export const createStore = catchAsync(async (req: Request, res: Response) => {
  const { name, latitude, longitude } = req.body;

  // 1️⃣) 📝 Insert store
  const result = await pool.query(
    `
            INSERT INTO stores (name, latitude, longitude)
            VALUES ($1, $2, $3)
            RETURNING *;
        `,
    [name, latitude, longitude],
  );

  // 2️⃣) 🎉 Success response
const createdStore = result.rows[0];

return sendResponse({
  req,
  res,
  statusCode: 201,
  message: "🏬 Store created successfully",
  data: { store: createdStore },
});
});

//! Get All Stores - GET /api/v1/stores 🚀
export const getAllStores = catchAsync(async(req: Request, res: Response) => {
  // 1️⃣ Get all stores from DB
  const result = await pool.query(
    "SELECT id, name, latitude, longitude  FROM stores",
  );

  // Exact Stores and Total Stores from results
  const stores = result.rows;
  const total_stores = result.rowCount;



  //2️⃣ Send all stores to user
  return sendResponse({
    req,
    res,
    statusCode: 201,
    message: "All Stores send succesfully✌️",
    data: {
      total_stores,
      stores,
    },
  });
}
  
)
