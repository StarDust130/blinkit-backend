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
export const getAllProducts = catchAsync(async (req: Request, res: Response) => {

    const limit = Math.max(Number(req.query.limit) || 10, 50);
    const page = Math.min(Number(req.query.page) || 1,1);

    const offset = (page - 1) * limit;

    //1️⃣ Get product from DB
    const result = await pool.query(
      ` SELECT id, name, description, base_price, category
      FROM products
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2
        `,
      [limit, offset],
    );


    //2️⃣ Send Response
    return sendResponse({
      res,
      req,
      message: "Product as you want✌️🎉",
      statusCode: 200,
      data: {
        result: { products: result.rows[0]},
      },
    });




})