import { Router } from "express";
import {
  getStoreInventory,
  syncInventory,
} from "../controllers/inventory.controller";
import { validate } from "../utils/validate";
import { syncInventorySchema } from "../types/inventorySchema";


const router = Router();

// 📍 POST /api/v1/inventory (Uses Zod Shield)
router.post("/", validate(syncInventorySchema), syncInventory);

// 📍 GET /api/v1/inventory/1234-5678-abcd... (Get items in ONE store)
router.get("/:storeId", getStoreInventory);

export default router;
