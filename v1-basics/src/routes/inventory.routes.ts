import { Router } from "express";
import { getStoreInventory, updateInventory } from "../controllers/inventory.controller";


const router = Router()

router.post("/", updateInventory);
router.get("/", getStoreInventory);



export default Router