import { Router } from "express";
import { createProduct } from "../controllers/product.controller";
import { validate } from "../utils/validate";
import { productBodySchema } from "../types/product.schema";



const router = Router()

// Create - POST
router.get("/", validate(productBodySchema)  ,createProduct);

export default router