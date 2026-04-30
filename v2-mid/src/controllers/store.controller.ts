import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/response";
import prisma from "../config/prisma"


//! Create Stores -  POST /api/v1/stores
export const createStore = catchAsync(async (req: Request, res: Response) => {
  const { name, latitude, longitude } = req.body;


  // 1️⃣ 🏬 Create store in DB (Prisma)
  const createdStore = await prisma.store.create({
    data: {
      name,
      latitude,
      longitude,
    },
  });

  // 2️⃣ 🎉 Send success response
  return sendResponse({
    req,
    res,
    statusCode: 201,
    message: "🏬 Store created successfully",
    data: { store: createdStore },
  });
});

export const getAllStores = catchAsync(async (req: Request , res: Response) => {

});