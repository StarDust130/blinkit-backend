import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/response";
import prisma from "../config/prisma";

//! Create Stores -  POST /api/v2/stores
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

//! Get All Stores - GET /api/v2/stores (pagination + sorting + total count)
export const getAllStores = catchAsync(async (req: Request, res: Response) => {
  // 1️⃣ 📥 Parse & sanitize query params
  const page = Math.max(Number(req.query.page) || 1, 1); // min 1
  const limit = Math.min(Number(req.query.limit) || 10, 50); // 🔒 cap at 50
  const sort =
    (req.query.sort as string)?.toLowerCase() === "asc" ? "asc" : "desc"; // Prisma uses lowercase

  // 🧮 Calculate offset
  const skip = (page - 1) * limit;

  // 2️⃣ 🔄 Fetch data + total count (run in parallel)
  const [stores, total_stores] = await Promise.all([
    prisma.store.findMany({
      skip, // offset
      take: limit, // limit
      orderBy: {
        createdAt: sort, // sort by created time
      },
      select: {
        id: true,
        name: true,
        latitude: true,
        longitude: true,
        createdAt: true,
      },
    }),

    prisma.store.count(), // total rows (for pagination)
  ]);

  // 3️⃣ 📊 Calculate total pages
  const total_pages = Math.ceil(total_stores / limit);

  // 4️⃣ 🎯 Send response
  return sendResponse({
    req,
    res,
    statusCode: 200,
    message: "🌍 Stores fetched successfully",
    data: {
      page,
      limit,
      total_stores,
      total_pages,
      stores,
    },
  });
});