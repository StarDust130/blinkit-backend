import { z } from "zod";

export const productBodySchema = z
  .object({
    name: z
      .string()
      .min(1, "Product Name is Required 😤")
      .max(50, "Product Name is too long")
      .transform((s) => s.trim()),
    description: z
      .string()
      .min(3, "Description too short")
      .max(2000, "Description is too long")
      .transform((s) => s.trim()),
    // Accept numbers or numeric strings; ensure non-negative and max 2 decimal places
    base_price: z.coerce
      .number()
      .refine((n) => Number.isFinite(n) && n >= 0, {
        message: "Base price must be a non-negative number",
      })
      .refine((n) => Math.round(n * 100) === n * 100, {
        message: "Base price can have at most 2 decimal places",
      }),
    category: z
      .string()
      .min(1, "Category Name is Required 😤")
      .max(100, "Category Name is too long")
      .transform((s) => s.trim()),
    sku: z.string().trim().optional(),
    stock: z.coerce.number().int().nonnegative().optional(),
  })
  .strict();

export const syncProductSchema = z.object({
  body: productBodySchema,
});

export type ProductBody = z.infer<typeof productBodySchema>;
export type SyncProductSchema = z.infer<typeof syncProductSchema>;
