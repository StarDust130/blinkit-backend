import { Router } from "express";
import { createStore, getAllStores } from "../controllers/store.controller";
import { validate } from "../utils/validate";
import { createStoreSchema } from "../types/store.schema";

const router = Router();

// POST /api/v1/stores
router.get("/", getAllStores);

router.post("/", validate(createStoreSchema), createStore);


export default router;
