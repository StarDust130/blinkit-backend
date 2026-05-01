import { Request, Response } from "express";
import { z } from "zod";
import prisma from "../config/prisma.js";
import { catchAsync } from "../utils/catchAsync.js";



// 2 & 3. The Engine + Janitor
export const createUser = catchAsync(async (req: Request, res: Response) => {
  // Step A: Validate the req.body using userSchema.parse()
  // Step B: Use prisma.user.create() to save the user
  // Step C: res.status(201).json({ success: true, data: newUser })
});
