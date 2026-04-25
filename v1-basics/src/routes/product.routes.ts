import { Router } from "express";
import { createProduct } from "../controllers/product.controller";


const router = Router()

// /api/v1/createProduct
router.post("/", createProduct);


export default router;