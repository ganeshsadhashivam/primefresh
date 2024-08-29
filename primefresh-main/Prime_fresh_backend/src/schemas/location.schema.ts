import { z } from "zod";
import { addressSchema } from "./user.schema";

export const LocationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: addressSchema.optional() ,
  contactNumber: z.string().optional(),
  alternateContactNumber: z.string().optional(),
  notes: z.string().optional(),
  capacity: z.number().min(1, "Capacity must be greater than 0"),
  email: z.string().email("Invalid email address").optional(),
  contactPersonFirstName: z.string().optional(),
  contactPersonMiddleName: z.string().optional(),
  contactPersonLastName: z.string().optional(),
  type: z.enum(["COLLECTION_CENTER", "DISTRIBUTION_CENTER", "REGISTERED_OFFICE", "OFFICE"]),
});

export type LocationInput = z.infer<typeof LocationSchema>;
