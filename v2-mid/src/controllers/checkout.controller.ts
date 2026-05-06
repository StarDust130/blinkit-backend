import { Request, Response, NextFunction } from "express";
import prisma from "../config/prisma.js";
import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/AppError.js";
import { sendResponse } from "../utils/response.js";

export const processCheckout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1️⃣ Get data from request
    const { storeId, userId, items } = req.body;

    // 2️⃣ Start database transaction - rollback on any error
    const receipt = await prisma.$transaction(async (tx) => {
      let totalAmount = 0;
      const orderItemsData = [];

      // 3️⃣ Loop through each item in cart
      for (const item of items) {
        // 4️⃣ Check product exists
        const product = await tx.product.findUnique({
          where: { id: item.productId },
        });

        if (!product) {
          throw new AppError(
            `Product with ID ${item.productId} does not exist.`,
            404,
          );
        }

        // 5️⃣ Find stock at store
        const inventory = await tx.inventory.findFirst({
          where: {
            storeId: storeId,
            productId: item.productId,
          },
        });

        // 6️⃣ Check if product is stocked
        if (!inventory) {
          throw new AppError(
            `Product '${product.name}' is not stocked at this store.`,
            400,
          );
        }

        // 7️⃣ Check enough stock available
        if (inventory.quantity < item.quantity) {
          throw new AppError(
            `Insufficient stock for '${product.name}'. Only ${inventory.quantity} remaining.`,
            400,
          );
        }

        // 8️⃣ Reduce stock count safely
        await tx.inventory.update({
          where: { id: inventory.id },
          data: { quantity: { decrement: item.quantity } },
        });

        // 9️⃣ Calculate total price
        totalAmount += product.basePrice.toNumber() * item.quantity;

        // 🔟 Store item details for order
        orderItemsData.push({
          productId: item.productId,
          quantity: item.quantity,
          priceAtBuy: product.basePrice,
        });
      }

      // 1️⃣1️⃣ Create order with all items
      const order = await tx.order.create({
        data: {
          userId: userId,
          storeId: storeId,
          totalAmount: totalAmount,
          status: "PAID",
          items: {
            create: orderItemsData,
          },
        },
        include: {
          items: true,
        },
      });

      return order;
    });

    // 1️⃣2️⃣ Send success response
    return sendResponse({
      res,
      req,
      statusCode: 201,
      message: "✅ Checkout complete. Inventory safely deducted.",
      data: receipt,
    });
  },
);
