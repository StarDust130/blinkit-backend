import { Router } from "express";
import { createProduct, getAllProducts } from "../controllers/product.controller";
import { validate } from "../utils/validate";
import { syncProductSchema } from "../types/product.schema";


const router = Router()

// /api/v1/createProduct
router.post("/", validate(syncProductSchema) , createProduct);
router.get("/", getAllProducts);


export default router;