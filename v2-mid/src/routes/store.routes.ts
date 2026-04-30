import { Router } from "express";
import { createStore, getAllStores } from "../controllers/store.controller";

const router = Router()

// POST /api/v1/stores
router.get("/", createStore);

router.get("/", getAllStores);


export default router;
