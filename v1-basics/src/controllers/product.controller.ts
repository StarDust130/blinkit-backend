import { Response , Request } from "express";
import { catchAsync } from "../utils/catchAsync";
import pool from "../config/db";
import { sendResponse } from "../utils/response";


//! createProduct - POST /api/v1/products 🚀
export const createProduct = catchAsync(async (req: Request, res: Response) => {
  const { name, description, base_price, category } = req.body;

  //1️⃣) 📝 Add Product
  const result = await pool.query(
    ` INSERT INTO products (name, description, base_price, category)
    VALUES ($1,$2,$3,$4)
    RETURNING *;
    `,
    [name, description, base_price, category],
  );

  //2️⃣) 🎉 Success response
  return sendResponse({
    res,
    req,
    message: "Product Created successfully 🥳🎉",
    statusCode: 201,
    data: { product: result.rows[0] },
  });
})


//! getAllProducts - GET /api/v1/products
export const getAllProducts = catchAsync((req: Request, res: Response) => {

})