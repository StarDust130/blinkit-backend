import { z } from "zod";

export const syncInventorySchema = z.object({
  body: z.object({
    store_id: z.uuid({ message: "Invalid Store Barcode (UUID)" }),
    product_id: z.uuid({ message: "Invalid Product Barcode (UUID)" }),
    quantity: z.number().min(0, { message: "Quantity cannot be negative" }),
  }),
});
