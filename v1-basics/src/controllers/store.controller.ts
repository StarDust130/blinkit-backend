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
export const getAllStores = catchAsync(async (req: Request, res: Response) => {
  // 1️⃣ 📥 Read query params (pagination + sorting)
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Number(req.query.limit) || 10, 50); // 🔒 max 50
  const sort =
    (req.query.sort as string)?.toLowerCase() === "asc" ? "ASC" : "DESC";

  // 🦘 Calculate offset
  const offset = (page - 1) * limit;

  // 2️⃣ 🔍 Fetch paginated stores
const result = await pool.query(
  `
  SELECT id, name, latitude, longitude, created_at,
         COUNT(*) OVER() AS total_count
  FROM stores
  ORDER BY created_at ${sort}
  LIMIT $1 OFFSET $2
  `,
  [limit, offset],
);



  // 3️⃣ 📊 Get total count (for pagination UI)
  const total_stores = result.rows[0]?.total_count || 0;

  // 4️⃣ 🎯 Send response
  return sendResponse({
    req,
    res,
    statusCode: 200,
    message: "🌍 Stores fetched successfully",
    data: {
      page,
      limit,
      total_stores,
      total_pages: Math.ceil(total_stores / limit), // 📄 useful for frontend
      stores: result.rows,
    },
  });
});
