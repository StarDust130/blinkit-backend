import {z} from "zod";

export const checkoutSchema = z.object({
  body: z.object({
    store_id: z.string({ message: "Invalid Store Id" }),
    user_id: z.string({ message: "Invalid User Id" }),
    items: z.array(
      z.object({
        productId: z.string({ message: "Invalid Product Id" }),
        quantity: z.number({ message: "Invalid Quantity" }),
      })
    ),
  }),
});