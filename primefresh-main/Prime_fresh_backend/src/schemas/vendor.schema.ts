import { array, object, string } from "zod";
import { addressSchema } from "./user.schema";
import { z } from "zod";
// Define the status enum
const VendorStatusEnum = z.enum([
  "pending",
  "approved",
  "rejected",
  "inactive",
  "suspended",
  "under_review",
]);
export const CreatevendorSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    contactname: string({
      required_error: "Contactname is required",
    }),
    contactphone: string({
      required_error: "ContactPhone is required",
    }),
    gstn: string().optional(),
    comments: string().optional(),
    description: string({
      required_error: "Description is required",
    }),

    address: addressSchema,
    categoryId: string(),
    status: VendorStatusEnum.optional(),
    subcategoryId: string(),
  }),
});
export type CreateVendorInput = z.infer<typeof CreatevendorSchema>["body"];


