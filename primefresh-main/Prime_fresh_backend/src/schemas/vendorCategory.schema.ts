// vendorCategory.schema.ts

import * as z from "zod";

export const VendorcategorySchema = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
});
export const CreateVendorSubcategorySchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    categoryId: z.string({ required_error: "Category ID is required" }),
  }),
});

export const UpdateVendorSubcategorySchema = z.object({
  body: z.object({
    name: z.string().optional(),
    categoryId: z.string().optional(),
  }),
});
