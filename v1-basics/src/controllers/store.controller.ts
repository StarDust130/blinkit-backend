import { Request, Response } from "express";
import pool from "../config/db";
import { catchAsync } from "../utils/catchAsync";

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

return res.status(201).json({
    status: "success",
    message: "🏬 Store created successfully ✅",
    data: {
        store: createdStore,
    },
    meta: {
        timestamp: new Date().toISOString(),
        requestId: req.headers["x-request-id"] ?? null,
    },
});
});
