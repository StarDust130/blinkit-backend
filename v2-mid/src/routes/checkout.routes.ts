import { Router } from "express"
import { checkoutSchema } from "../types/checkout.schema"
import { processCheckout } from "../controllers/checkout.controller";
import { validate } from "../utils/validate";


const router = Router()

router.post( "/" , validate(checkoutSchema), processCheckout);


export default router