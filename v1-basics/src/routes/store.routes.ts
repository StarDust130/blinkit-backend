import { Router } from "express";
import { createStore } from "../controllers/store.controller";
import { validate } from "../utils/validate";
import { createStoreSchema } from "../types/store.schema";

const router = Router();

// POST /api/v1/stores
router.post("/", validate(createStoreSchema), createStore);

export default router;
