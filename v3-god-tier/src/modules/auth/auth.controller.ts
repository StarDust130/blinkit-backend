
import { Request, Response } from "express";

import { asyncHandler } from "../../shared/utils/async-handler.js";
import { sendResponse } from "../../shared/utils/send-response.js";

import { loginUser, registerUser } from "./auth.service.js";

// 🔐 Register controller
export const registerController = asyncHandler(async (req: Request, res: Response) => {
  const result = await registerUser(req.body);

  sendResponse(res, 201, "User registered successfully", result);
});

// 🔑 Login controller
export const loginController = asyncHandler(async (req, res) => {
  const result = await loginUser(req.body);

  sendResponse(res, 200, "Login successful", result);
});

