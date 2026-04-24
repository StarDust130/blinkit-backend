import { Request, Response } from "express";
import pool from "../config/db";
import { catchAsync } from "../utils/catchAsync";

//! Create Store - POST /api/v1/stores 🚀
export const createStore = catchAsync(async (req: Request, res: Response) => {
  const { name, latitude, longitude } = req.body;

  // ✅ Basic validation
  if (!name || !latitude || !longitude) {
    throw new Error("All fields are required");
  }

  // 📝 Insert store
  const result = await pool.query(
    `
            INSERT INTO stores (name, latitude, longitude)
            VALUES ($1, $2, $3)
            RETURNING *;
        `,
    [name, latitude, longitude],
  );

  // 🎉 Success response
  return res.status(201).json({
    status: "success",
    data: result.rows[0],
  });
});
