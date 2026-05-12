import { Router } from "express";

import { validateRequest } from "@/shared/middlewares/validate-request.js";

import {
  loginController,
  registerController,
} from "./auth.controller.js";

import { loginSchema, registerSchema } from "./auth.schema.js";

const router = Router();

// 🔐 Register routea
router.post(
  "/register",
  validateRequest(registerSchema),
  registerController
);

// 🔑 Login route
router.post("/login", validateRequest(loginSchema), loginController);

export default router;

