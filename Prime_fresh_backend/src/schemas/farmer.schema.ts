import { object, TypeOf, z } from "zod";
import { Status } from "../utils/status.enum";



// Define the Farmer schema
export const FarmerSchema = z.object({
    body:object({
  first_name: z.string().min(1, "First name is required").max(100, "First name is too long"),
  middle_name: z.string().max(100, "Middle name is too long").optional(),
  last_name: z.string().min(1, "Last name is required").max(100, "Last name is too long"),
  age: z.number().int().positive("Age must be a positive number"),
  gender: z.string().length(10, "Gender must be exactly 10 characters long"),
  mobile_no: z.string().length(15, "Mobile number must be exactly 15 characters long"),
  email: z.string().email().optional(),
  pincode: z.string().length(10, "Pincode must be exactly 10 characters long"),
  farm_location: z.string().min(1, "Farm location is required").max(255, "Farm location is too long"),
  land_area_total: z.number().positive("Land area total must be a positive number"),
  total_area_uom: z.string().length(10, "Total area UOM must be exactly 10 characters long"),
  land_area_cultivation: z.number().positive("Land area cultivation must be a positive number"),
  cultivation_area_uom: z.string().length(10, "Cultivation area UOM must be exactly 10 characters long"),
  irrigation_source: z.string().max(100, "Irrigation source is too long"),
  irrigation_type: z.string().max(100, "Irrigation type is too long"),
  soil_type: z.string().max(100, "Soil type is too long"),
  farm_type: z.string().max(100, "Farm type is too long"),
  farm_product: z.string().max(255, "Farm product is too long"),
  harvest_date: z.date(),
    status: z.enum([Status.PENDING, Status.APPROVED, Status.REJECTED, Status.ACTIVE])
  .default(Status.PENDING), 
})
})




// Define Zod schema for Farmer
export const farmerSchema = z.object({
  first_name: z.string().optional(),
  middle_name: z.string().optional(),
  last_name: z.string().optional(),
  age: z.number().optional(),
  gender: z.string().optional(),
  mobile_no: z.string().optional(),
  email: z.string().email("Invalid email address").optional(),
  farm_location: z.string().optional(),
  land_area_total: z.number().optional(),
  total_area_uom: z.string().optional(),
  land_area_cultivation: z.number().optional(),
  cultivation_area_uom: z.string().optional(),
  irrigation_source: z.string().optional(),
  irrigation_type: z.string().optional(),
  soil_type: z.string().optional(),
  farm_type: z.string().optional(),
  farm_product: z.string().optional(),
  harvest_date: z.date().optional(),
  status: z.nativeEnum(Status).default(Status.PENDING).optional(),
  
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().optional(),
 
});

export type UpdateFarmerInput = TypeOf<typeof farmerSchema>;





export type FarmerInput = z.infer<typeof FarmerSchema>["body"];