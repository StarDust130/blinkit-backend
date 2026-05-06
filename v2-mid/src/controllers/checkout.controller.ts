import { Request, Response, NextFunction } from "express";
import prisma from "../config/prisma.js";
import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/AppError.js";

export const processCheckout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { storeId, userId, items } = req.body;

    // 🛑 The ACID Transaction Engine
    // If ANY error is thrown inside this block, Postgres instantly rolls back every change.
    const receipt = await prisma.$transaction(async (tx) => {
      let totalAmount = 0;
      const orderItemsData = [];

      // 1️⃣ Loop through the cart
      for (const item of items) {
        // A) Verify Product & Get Price
        const product = await tx.product.findUnique({
          where: { id: item.productId },
        });

        if (!product) {
          throw new AppError(
            `Product with ID ${item.productId} does not exist.`,
            404,
          );
        }

        // B) Fetch Exact Inventory at this specific Dark Store
        const inventory = await tx.inventory.findFirst({
          where: {
            storeId: storeId,
            productId: item.productId,
          },
        });

        // C) The Stock Shield (Prevents Negative Inventory)
        if (!inventory) {
          throw new AppError(
            `Product '${product.name}' is not stocked at this store.`,
            400,
          );
        }

        if (inventory.quantity < item.quantity) {
          throw new AppError(
            `Insufficient stock for '${product.name}'. Only ${inventory.quantity} remaining.`,
            400,
          );
        }

        // D) The Atomic Deduction
        // We use `decrement` instead of mathematically doing `inventory.quantity - item.quantity`
        // This prevents race conditions if two users hit 'Buy' at the exact same millisecond.
        await tx.inventory.update({
          where: { id: inventory.id },
          data: { quantity: { decrement: item.quantity } },
        });

        // E) Financial Math
        totalAmount += product.basePrice.toNumber() * item.quantity;

        // F) Prepare Receipt Line Items
        orderItemsData.push({
          productId: item.productId,
          quantity: item.quantity,
          priceAtBuy: product.basePrice, // CRITICAL: Save historical price. If price changes tomorrow, this receipt must not change.
        });
      }

      // 2️⃣ Generate The Parent Receipt & Line Items in ONE command
      const order = await tx.order.create({
        data: {
          userId: userId,
          storeId: storeId,
          totalAmount: totalAmount,
          status: "PAID", // Assuming successful transaction
          items: {
            create: orderItemsData, // Prisma relational magic: Creates the OrderItems automatically linked to this Order
          },
        },
        include: {
          items: true, // Return the full receipt with line items to the frontend
        },
      });

      return order;
    });

    // 3️⃣ Send Success Response
    res.status(201).json({
      success: true,
      message: "✅ Checkout complete. Inventory safely deducted.",
      data: receipt,
    });
  },
);
