import { z } from "zod";

export const SupplierSchema = z.object({
  partyName: z.string().min(1, "Party name is required"),
  inFAndVBusinessSince: z.string().optional(), // Optional if you want this to be a string (can also use z.date() if it's a date)
  contactPerson: z.string().min(1, "Contact person is required"),
  contactNumber: z
    .string()
    .min(10, "Contact number must be at least 10 digits")
    .max(15, "Contact number can't exceed 15 digits"),
  alternateContactNumber: z.string().optional(), // Optional contact number
  officeAddress: z.string().min(1, "Office address is required"),
  officeLandlineNumber: z.string().optional(), // Optional landline number
  mainProductsToBeSupplied: z
    .string()
    .min(1, "Main products to be supplied are required"),
  listOfAllProducts: z.array(z.string()).optional(), // List of products as an array of strings
  dispatchCenter: z.string().optional(),
  warehouseLocations: z.string().optional(),
  packingCenterLocation: z.string().optional(),
  PANNumber: z.string().optional(),
  TradeLicenseNumber: z.string().optional(),
  proposedPaymentTerms: z.string().optional(),
  anyOtherDetailsRegardingTeamAndInfrastructure: z.string().optional(),
  submittedBy: z.string().min(1, "Submitted by is required"),
});

export type SupplierDTO = z.infer<typeof SupplierSchema>;
