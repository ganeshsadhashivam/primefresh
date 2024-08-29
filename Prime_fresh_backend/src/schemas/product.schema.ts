import { z } from "zod";

// Define the Product schema
export const ProductSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required").max(255, "Name is too long"),
    image: z.string().min(1, "Image is required").max(255, "Image is too long"),
    classification: z.string().uuid("Invalid UUID format for classificationId").optional(),
    category: z.string().uuid("Invalid UUID format for categoryId"),
    subcategory: z.string().uuid("Invalid UUID format for subcategoryId"),
    uom: z.string().uuid("Invalid UUID format for uomId"),
    returnable: z.boolean(),
    description: z.string().optional(), // Optional field
    product_code: z.string().min(1, "Product code is required").max(50, "Product code is too long")
  })
});

// Export the inferred type for use in your application
export type ProductInput = z.infer<typeof ProductSchema>["body"];
