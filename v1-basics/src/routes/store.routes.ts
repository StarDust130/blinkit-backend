import { Router } from "express";
import { createStore } from "../controllers/store.controller";

const router = Router();

// POST /api/v1/stores
router.post("/", createStore);

export default router;
