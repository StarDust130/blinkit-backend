import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/response";



export const createStore = catchAsync(async (req: Request, res: Response) => {
  const { name, latitude, longitude } = req.body;

  // 1️⃣ 🧪 Basic validation (don’t trust input)
  if (!name || latitude == null || longitude == null) {
    throw new Error("Name, latitude and longitude are required");
  }

  // 2️⃣ 🏬 Create store in DB (Prisma)
  const createdStore = await prisma.store.create({
    data: {
      name,
      latitude,
      longitude,
    },
  });

  // 3️⃣ 🎉 Send success response
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