import { z } from "zod";

export const createStoreSchema = z.object({
  body: z.object({
    name: z
      .string({ error: "Store name is required" })
      .min(3, "Name too short"),
    latitude: z
      .number({ error: "Latitude must be a number" })
      .min(-90)
      .max(90),
    longitude: z
      .number({ error: "Longitude must be a number" })
      .min(-180)
      .max(180),
  }),
});
