import { Request, Response } from "express";
import pool from "../config/db";

//! Create Store - POST /api/stores
export const createStore = async (req: Request, res: Response) => {
  try {
    // 📥 Extract payload from request body
    const { name, latitude, longitude } = req.body;

    // ✅ Basic validation
    if (
      typeof name !== "string" ||
      !name.trim() ||
      latitude === undefined ||
      longitude === undefined
    ) {
      return res.status(400).json({
        message: "Name, latitude, and longitude are required.",
      });
    }

    // 🧼 Normalize values
    const storeName = name.trim();

    // 🗄️ Insert new store safely using parameterized query
    const query = `
            INSERT INTO stores (name, latitude, longitude)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
    const values = [storeName, latitude, longitude];

    const { rows } = await pool.query(query, values);

    // 🎉 Return created store
    return res.status(201).json(rows[0]);
  } catch (error: unknown) {
    console.error("❌ Error creating store:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
