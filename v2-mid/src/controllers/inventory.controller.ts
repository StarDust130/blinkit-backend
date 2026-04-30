import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/response";
import prisma from "../config/prisma"

//! Sync Inventory (Add/Update) - POST /api/v2/inventory 📦
export const syncInventory = catchAsync(async (req: Request, res: Response) => {
  const { storeId, productId, quantity } = req.body;


  // 1️⃣ 📦 Upsert inventory (insert OR update)
  const inventory = await prisma.inventory.upsert({
    where: {
      // ⚠️ requires composite unique key in schema
      storeId_productId: {
        storeId,
        productId,
      },
    },
    update: {
      // ➕ increase quantity
      quantity: {
        increment: quantity,
      },
    },
    create: {
      storeId,
      productId,
      quantity,
    },
  });

  // 2️⃣ 🎉 Response
  return sendResponse({
    req,
    res,
    statusCode: 200,
    message: "📦 Inventory updated successfully",
    data: { inventory },
  });
});

//! Get Specific Store Inventory - GET /api/v2/inventory/:storeId 🏪
export const getStoreInventory = catchAsync(
  async (req: Request, res: Response) => {
    const { storeId } = req.params;

    // 1️⃣ 🔍 Fetch inventory + related product
 const inventory = await prisma.inventory.findMany({
   where: {
     storeId: String(storeId), 
   },
   include: {
     product: {
       select: {
         id: true,
         name: true,
         basePrice: true,
         category: true,
       },
     },
   },
 });

    // 2️⃣ 🎉 Response
    return sendResponse({
      req,
      res,
      statusCode: 200,
      message: "📋 Store inventory fetched successfully",
      data: {
        results: inventory.length,
        inventory,
      },
    });
  },
);