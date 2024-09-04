import { object, string, TypeOf, z } from "zod";
import { addressSchema } from "./user.schema";
import { Status } from "../utils/status.enum";

// Define the schema without wrapping it in a `body` object
// export const createCustomerSchema = z.object({
//   name: z.string().optional(),
//   business_name: z.string().optional(),
//   email: z.string().email().optional(),
//   status: z
//     .enum([Status.PENDING, Status.APPROVED, Status.REJECTED, Status.ACTIVE])
//     .default(Status.PENDING)
//     .optional(),
//   mobile_no: z.string().optional(),
//   notes: z.string().optional(),
//   contact_person: z.string().optional(),
//   customerCategory: z.string().optional(),
//   customerType: z.string().optional(),
//   address: addressSchema.optional(),
// });

const StatusEnum = z.enum(["PENDING", "APPROVED", "ACTIVE", "INACTIVE"]);

const createCustomerSchema = z.object({
  customerCategory: z.string().optional(),
  customerType: z.string().optional(),

  business_name: z.string().optional().nullable(),
  email: z.string().email().optional().nullable(),

  status: StatusEnum.default("PENDING"),

  mobile_no: z.string().min(10).max(15).optional().nullable(),

  notes: z.string().optional().nullable(),

  contact_person: z.string().optional().nullable(),

  address: addressSchema.optional(),

  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  middleName: z.string().optional().nullable(),

  accEmail: z.string().email().optional().nullable(),

  employeeCode: z.string().optional().nullable(),

  manager: z.string().optional().nullable(),

  ledgerReconciledDate: z.string().optional().nullable(), // storing date as string

  referredBy: z.string().optional().nullable(),

  pMobileNo: z.string().min(10).max(15).optional().nullable(),

  cMobileNo: z.string().min(10).max(15).optional().nullable(),
});

const params = {
  params: object({
    id: string().uuid(),
  }),
};

export const CustomerIdSchema = object({
  ...params,
});
// Define the TypeScript type from the schema

export const customerSchema = z.object({
  name: z.string().optional(),
  customerCategoryId: z
    .string()
    .uuid("Invalid Customer Category ID format")
    .optional(),
  customerTypeId: z.string().uuid("Invalid Customer Type ID format").optional(),
  business_name: z.string().optional(),
  email: z.string().optional(),
  mobile_no: z.string().optional(),
  notes: z.string().optional(),
  contact_person: z.string().optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
});

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;
export type UpdateCustomerInput = TypeOf<typeof customerSchema>;
export type GetCustomerInput = TypeOf<typeof CustomerIdSchema>["params"];
