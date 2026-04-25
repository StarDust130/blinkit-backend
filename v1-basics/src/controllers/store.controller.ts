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

//! Get All Stores - GET /api/v1/stores 🌍
export const getAllStores = catchAsync(async(req: Request, res: Response) => {
  // 1️⃣) 🧮 Pagination Setup (Read from URL, e.g., ?limit=10&page=2)
  // If user doesn't send page or limit, we default to page 1, limit 10
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  // 🦘 Calculate how many rows to skip
  const offset = (page - 1) * limit;

  // 2️⃣) 🔍 Fetch from Database
  const result = await pool.query(
    `SELECT id, name, latitude, longitude  
    FROM stores 
    ORDER BY created_at DESC -- 🕒 Newest stores first
    LIMIT $1 OFFSET $2 -- 🛑 Stop the server from crashing!

    `,
    [limit, offset],
  );

  // Exact Stores and Total Stores from results
  const stores = result.rows;
  const total_result = result.rowCount;
  const totalResult = await pool.query("SELECT COUNT(*) FROM stores");
  const total_stores = Number(totalResult.rows[0].count);

  // 3️⃣) 🎉 Success Response
  return sendResponse({
    req,
    res,
    statusCode: 201,
    message: "🌍 Stores fetched successfully",
    data: {
      total_stores,
      total_result,
      stores,
    },
  });
}
  
)
