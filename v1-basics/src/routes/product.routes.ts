import { Router } from "express";
import { createProduct, getAllProducts } from "../controllers/product.controller";


const router = Router()

// /api/v1/createProduct
router.post("/", createProduct);
router.get("/", getAllProducts);


export default router;