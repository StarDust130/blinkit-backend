import { Router } from "express";
import { createProduct } from "../controllers/product.controller";
import { validate } from "../utils/validate";
import { productBodySchema } from "../types/product.schema";

const router = Router();

// 📦 Create Product
router.post(
  "/",
  validate(productBodySchema), // 🧪 validate input first
  createProduct, // 🚀 then run controller
);

export default router;
