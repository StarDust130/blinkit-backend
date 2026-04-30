import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import prisma from "../config/prisma";
import { sendResponse } from "../utils/response";

//! Create Product - POST /api/v2/product
export const createProduct = catchAsync(async (req: Request, res: Response) => {
  const { name, description, basePrice, category } = req.body;

  //1️⃣)  📦 Create Products in DB (Prisma)
  const product = await prisma.product.create({
    data: {
      name,
      description,
      basePrice,
      category,
    },
  });

  // 2️⃣ 🎉 Send success response
  return sendResponse({
    req,
    res,
    statusCode: 201,
    message: "📦 Product created successfully",
    data: { product },
  });
});

//! GetAllProduct - GET /api/v2/product
export const getAllProducts = catchAsync(
  async (req: Request, res: Response) => {
    // 1️⃣ 📥 Parse & sanitize query params (fix your logic)
    const page = Math.max(Number(req.query.page) || 1, 1); // min = 1
    const limit = Math.min(Number(req.query.limit) || 10, 50); // max = 50

    const rawSort = req.query.sort;

    // 🔽 Prisma uses lowercase "asc" | "desc"
    const sort =
      typeof rawSort === "string" && rawSort.toLowerCase() === "asc"
        ? "asc"
        : "desc";

    // 🧮 Calculate offset
    const skip = (page - 1) * limit;

    // 2️⃣ 🔄 Fetch products + total count (parallel = faster)
    const [products, total_products] = await Promise.all([
      prisma.product.findMany({
        skip, // offset
        take: limit, // limit
        orderBy: {
          createdAt: sort, // sorting
        },
        select: {
          id: true,
          name: true,
          description: true,
          basePrice: true,
          category: true,
        },
      }),

      prisma.product.count(), // total rows for pagination
    ]);

    // 3️⃣ 📊 Calculate total pages
    const total_pages = Math.ceil(total_products / limit);

    // 4️⃣ 🎯 Send response
    return sendResponse({
      req,
      res,
      statusCode: 200,
      message: "📦 Products fetched successfully",
      data: {
        page,
        limit,
        total_products,
        total_pages,
        products, // ✅ full array (not just one item)
      },
    });
  },
);
