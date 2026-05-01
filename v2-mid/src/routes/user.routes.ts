import { Router } from "express";
import { validate } from "../utils/validate";
import { userSchema } from "../types/user.schema";
import { createUser } from "../controllers/user.controller";

const router = Router();

router.post("/", validate(userSchema), createUser);

export default router;
