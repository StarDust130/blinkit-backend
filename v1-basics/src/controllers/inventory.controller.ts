import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import pool from "../config/db";
import { sendResponse } from "../utils/response";



//! Sync Inventory (Add/Update) - POST /api/v1/inventory 📦
export const syncInventory = catchAsync(async (req: Request, res: Response) => {
  const { store_id, product_id, quantity } = req.body;

  const result = await pool.query(
    `INSERT INTO inventory (store_id, product_id, quantity)
     VALUES ($1, $2, $3)
     ON CONFLICT (store_id, product_id)
     DO UPDATE SET quantity = inventory.quantity + EXCLUDED.quantity
     RETURNING *;`,
    [store_id, product_id, quantity],
  );

  return sendResponse({
    req,
    res,
    statusCode: 200,
    message: "Update Inventory Successfully ✌️🎉",
    data: { inventory: result.rows[0] },
  });
});



//! Get Specific Store Inventory - GET /api/v1/inventory/:storeId 🏪
export const getStoreInventory = catchAsync(async (req: Request, res: Response) => {
    const { storeId } = req.params; // Get the store barcode from the URL

    // 1️⃣) 🔍 Fetch Inventory + Product Details using a JOIN
    const result = await pool.query(
        `
            SELECT 
                i.quantity, 
                p.id AS product_id, 
                p.name AS product_name, 
                p.base_price, 
                p.category 
            FROM inventory i
            JOIN products p ON i.product_id = p.id
            WHERE i.store_id = $1;
        `,
        [storeId]
    );

    // 2️⃣) 🎉 Success response
    return sendResponse({
      res,
      req,
      statusCode: 200,
      message: "📋 Store inventory fetched successfully",

      data: {
        results: result.rowCount,
        inventory: result.rows,
      },
    });
});