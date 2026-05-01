import { Request, Response } from "express";
import prisma from "../config/prisma";
import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/response";

//! Create User - POST /api/v2/user
export const createUser = catchAsync(async (req: Request, res: Response) => {
  const { name, email, phone } = req.body;

  //1️⃣) Save the user 😤
  const user = await prisma.user.create({
    data: {
      name,
      email,
      phone,
    },
  });

  //2️⃣) Send Response
  return sendResponse({
    res,
    message: "👤User Created Successfully 🌟✌️",
    statusCode: 201,
    data: {user}
  });
});
