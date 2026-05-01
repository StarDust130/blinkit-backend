import { NextFunction, Request, Response } from "express";
import prisma from "../config/prisma";
import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/response";
import { AppError } from "../utils/AppError";

//! Create User - POST /api/v2/user
export const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, phone } = req.body;

    // 1️⃣ The Pre-Check (Takes 2ms. Prevents the DB from throwing a fatal constraint error)
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
    });

    // 2️⃣ Surgical Error Throwing
    if (existingUser) {
      if (existingUser.email === email) {
        return next(
          new AppError(`The email ${email} is already registered.`, 400),
        );
      }
      if (existingUser.phone === phone) {
        return next(
          new AppError(`The phone number ${phone} is already registered.`, 400),
        );
      }
    }

    // 3️⃣ Safe Execution
    const user = await prisma.user.create({
      data: { name, email, phone },
    });

    return sendResponse({
      res,
      message: "👤 User Created Successfully 🌟✌️",
      statusCode: 201,
      data: { user },
    });
  },
);
