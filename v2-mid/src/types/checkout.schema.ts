import { z } from "zod";

export const checkoutSchema = z.object({
  body: z.object({
    // 1️⃣ Use top-level z.uuid() and the new 'error' property
    storeId: z.uuid({ error: "Invalid Store ID format" }),
    userId: z.uuid({ error: "Invalid User ID format" }),
    items: z
      .array(
        z.object({
          productId: z.uuid({ error: "Invalid Product ID format" }),
          quantity: z
            .number()
            .int()
            .positive({ error: "Quantity must be at least 1" }),
        }),
      )
      .min(1, { error: "Cart cannot be empty" }),
  }),
});
