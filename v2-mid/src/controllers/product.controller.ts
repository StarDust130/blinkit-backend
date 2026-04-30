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
