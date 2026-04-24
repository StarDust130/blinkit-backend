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
