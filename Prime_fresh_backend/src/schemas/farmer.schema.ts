import { z } from "zod";

// Define the combined Farmer and Crop schema
export const FarmerSchema = z.object({
  farmerName: z
    .string()
    .max(100, "Farmer name must be 100 characters or less")
    .nullable()
    .optional(),
  farmerMobileNumber: z
    .string()
    .max(15, "Mobile number must be 15 characters or less")
    .nullable()
    .optional(),
  farmSize: z.number().max(999.99).nullable().optional(),
  district: z
    .string()
    .max(100, "District name must be 100 characters or less")
    .nullable()
    .optional(),
  village: z
    .string()
    .max(100, "Village name must be 100 characters or less")
    .nullable()
    .optional(),
  address: z.string().nullable().optional(),
  pincode: z
    .string()
    .max(6, "Pincode must be 6 characters or less")
    .nullable()
    .optional(),
  state: z
    .string()
    .max(50, "State name must be 50 characters or less")
    .nullable()
    .optional(),
  totalAcresPlanted: z.number().max(999.99).nullable().optional(),
  remarks: z.string().nullable().optional(),
  pictureOfFarmAndFarmer: z
    .array(z.string())
    .max(5, "You can upload up to 5 pictures")
    .nullable()
    .optional(),
  submittedByPFLEmployee: z
    .string()
    .max(100, "Submitted by PFL employee name must be 100 characters or less")
    .nullable()
    .optional(),
  submittedByFarmerAndOthers: z
    .string()
    .max(
      100,
      "Submitted by farmer and others name must be 100 characters or less"
    )
    .nullable()
    .optional(),
  yourMobileNumber: z
    .string()
    .max(15, "Your mobile number must be 15 characters or less")
    .nullable()
    .optional(),
  yourLocation: z.string().nullable().optional(),

  // Define the crops array directly within the FarmerSchema
  crops: z
    .array(
      z.object({
        id: z.string().optional(), // Optional for new crops without an ID yet
        crop: z.string().max(100, "Crop name must be 100 characters or less"),
        variety: z
          .string()
          .max(100, "Variety name must be 100 characters or less"),
        noOfPlants: z
          .number()
          .int()
          .min(1, "Number of plants must be at least 1"),
        pruningDate: z.string().nullable().optional(),
        expectedHarvestDate: z.string().nullable().optional(),
        expectedQuantityInTonnes: z.number().max(9999.99).nullable().optional(),
      })
    )
    .nullable()
    .optional(), // Include the crops array here
});

// Define TypeScript types based on the schemas
export type FarmerType = z.infer<typeof FarmerSchema>;
export type CropType = NonNullable<FarmerType["crops"]>[number]; // Corrected type definition for CropType

// import { z } from "zod";

// // Define the combined Farmer and Crop schema
// export const FarmerSchema = z.object({
//   farmerName: z
//     .string()
//     .max(100, "Farmer name must be 100 characters or less")
//     .nullable()
//     .optional(),
//   farmerMobileNumber: z
//     .string()
//     .max(15, "Mobile number must be 15 characters or less")
//     .nullable()
//     .optional(),
//   farmSize: z.number().max(999.99).nullable().optional(),
//   district: z
//     .string()
//     .max(100, "District name must be 100 characters or less")
//     .nullable()
//     .optional(),
//   village: z
//     .string()
//     .max(100, "Village name must be 100 characters or less")
//     .nullable()
//     .optional(),
//   address: z.string().nullable().optional(),
//   pincode: z
//     .string()
//     .max(6, "Pincode must be 6 characters or less")
//     .nullable()
//     .optional(),
//   state: z
//     .string()
//     .max(50, "State name must be 50 characters or less")
//     .nullable()
//     .optional(),
//   totalAcresPlanted: z.number().max(999.99).nullable().optional(),
//   remarks: z.string().nullable().optional(),
//   pictureOfFarmAndFarmer: z
//     .array(z.string())
//     .max(5, "You can upload up to 5 pictures")
//     .nullable()
//     .optional(),
//   submittedByPFLEmployee: z
//     .string()
//     .max(100, "Submitted by PFL employee name must be 100 characters or less")
//     .nullable()
//     .optional(),
//   submittedByFarmerAndOthers: z
//     .string()
//     .max(
//       100,
//       "Submitted by farmer and others name must be 100 characters or less"
//     )
//     .nullable()
//     .optional(),
//   yourMobileNumber: z
//     .string()
//     .max(15, "Your mobile number must be 15 characters or less")
//     .nullable()
//     .optional(),
//   yourLocation: z.string().nullable().optional(),

//   // Define the crops array directly within the FarmerSchema
//   crops: z
//     .array(
//       z.object({
//         id: z.string().optional(), // Optional for new crops without an ID yet
//         crop: z.string().max(100, "Crop name must be 100 characters or less"),
//         variety: z
//           .string()
//           .max(100, "Variety name must be 100 characters or less"),
//         noOfPlants: z
//           .number()
//           .int()
//           .min(1, "Number of plants must be at least 1"),
//         pruningDate: z.string().nullable().optional(),
//         expectedHarvestDate: z.string().nullable().optional(),
//         expectedQuantityInTonnes: z.number().max(9999.99).nullable().optional(),
//       })
//     )
//     .nullable()
//     .optional(), // Include the crops array here
// });

// // Define TypeScript types based on the schemas
// export type FarmerType = z.infer<typeof FarmerSchema>;
// export type CropType = FarmerType["crops"][number]; // Extract CropType from FarmerType

// import { z } from "zod";

// export const FarmerSchema = z.object({
//   farmerName: z
//     .string()
//     .max(100, "Farmer name must be 100 characters or less")
//     .nullable()
//     .optional(),
//   farmerMobileNumber: z
//     .string()
//     .max(15, "Mobile number must be 15 characters or less")
//     .nullable()
//     .optional(),
//   farmSize: z.number().max(999.99).nullable().optional(), // Precision: 5, Scale: 2
//   district: z
//     .string()
//     .max(100, "District name must be 100 characters or less")
//     .nullable()
//     .optional(),
//   village: z
//     .string()
//     .max(100, "Village name must be 100 characters or less")
//     .nullable()
//     .optional(),
//   address: z.string().nullable().optional(),
//   pincode: z
//     .string()
//     .max(6, "Pincode must be 6 characters or less")
//     .nullable()
//     .optional(),
//   state: z
//     .string()
//     .max(50, "State name must be 50 characters or less")
//     .nullable()
//     .optional(),
//   totalAcresPlanted: z.number().max(999.99).nullable().optional(), // Precision: 5, Scale: 2
//   remarks: z.string().nullable().optional(),
//   pictureOfFarmAndFarmer: z
//     .array(z.string())
//     .max(5, "You can upload up to 5 pictures")
//     .nullable()
//     .optional(),
//   submittedByPFLEmployee: z
//     .string()
//     .max(100, "Submitted by PFL employee name must be 100 characters or less")
//     .nullable()
//     .optional(),
//   submittedByFarmerAndOthers: z
//     .string()
//     .max(
//       100,
//       "Submitted by farmer and others name must be 100 characters or less"
//     )
//     .nullable()
//     .optional(),
//   yourMobileNumber: z
//     .string()
//     .max(15, "Your mobile number must be 15 characters or less")
//     .nullable()
//     .optional(),
//   yourLocation: z.string().nullable().optional(),
// });

// export type FarmerType = z.infer<typeof FarmerSchema>;

// import { z } from "zod";

// export const FarmerSchema = z.object({
//   farmerName: z.string().max(100, "Farmer name must be 100 characters or less"),
//   farmerMobileNumber: z
//     .string()
//     .max(15, "Farmer mobile number must be 15 characters or less"),
//   farmSize: z.number().min(0, "Farm size must be a positive number").nullable(),
//   district: z.string().max(100, "District must be 100 characters or less"),
//   village: z.string().max(100, "Village must be 100 characters or less"),
//   address: z.string().nullable(),
//   pincode: z.string().max(6, "Pincode must be 6 characters or less"),
//   state: z.string().max(50, "State must be 50 characters or less"),
//   totalAcresPlanted: z
//     .number()
//     .min(0, "Total acres planted must be a positive number")
//     .nullable(),
//   remarks: z.string().nullable(),
//   pictureOfFarmAndFarmer: z
//     .array(z.string())
//     .max(5, "You can upload up to 5 files")
//     .nullable(),
//   submittedByPFLEmployee: z.string().max(100).nullable(),
//   submittedByFarmerAndOthers: z.string().max(100).nullable(),
//   yourMobileNumber: z.string().max(15).nullable(),
//   yourLocation: z.string().nullable(),
// });

// import { object, TypeOf, z } from "zod";
// import { Status } from "../utils/status.enum";

// // Define the Farmer schema
// export const FarmerSchema = z.object({
//     body:object({
//   first_name: z.string().min(1, "First name is required").max(100, "First name is too long"),
//   middle_name: z.string().max(100, "Middle name is too long").optional(),
//   last_name: z.string().min(1, "Last name is required").max(100, "Last name is too long"),
//   age: z.number().int().positive("Age must be a positive number"),
//   gender: z.string().length(10, "Gender must be exactly 10 characters long"),
//   mobile_no: z.string().length(15, "Mobile number must be exactly 15 characters long"),
//   email: z.string().email().optional(),
//   pincode: z.string().length(10, "Pincode must be exactly 10 characters long"),
//   farm_location: z.string().min(1, "Farm location is required").max(255, "Farm location is too long"),
//   land_area_total: z.number().positive("Land area total must be a positive number"),
//   total_area_uom: z.string().length(10, "Total area UOM must be exactly 10 characters long"),
//   land_area_cultivation: z.number().positive("Land area cultivation must be a positive number"),
//   cultivation_area_uom: z.string().length(10, "Cultivation area UOM must be exactly 10 characters long"),
//   irrigation_source: z.string().max(100, "Irrigation source is too long"),
//   irrigation_type: z.string().max(100, "Irrigation type is too long"),
//   soil_type: z.string().max(100, "Soil type is too long"),
//   farm_type: z.string().max(100, "Farm type is too long"),
//   farm_product: z.string().max(255, "Farm product is too long"),
//   harvest_date: z.date(),
//     status: z.enum([Status.PENDING, Status.APPROVED, Status.REJECTED, Status.ACTIVE])
//   .default(Status.PENDING),
// })
// })

// // Define Zod schema for Farmer
// export const farmerSchema = z.object({
//   first_name: z.string().optional(),
//   middle_name: z.string().optional(),
//   last_name: z.string().optional(),
//   age: z.number().optional(),
//   gender: z.string().optional(),
//   mobile_no: z.string().optional(),
//   email: z.string().email("Invalid email address").optional(),
//   farm_location: z.string().optional(),
//   land_area_total: z.number().optional(),
//   total_area_uom: z.string().optional(),
//   land_area_cultivation: z.number().optional(),
//   cultivation_area_uom: z.string().optional(),
//   irrigation_source: z.string().optional(),
//   irrigation_type: z.string().optional(),
//   soil_type: z.string().optional(),
//   farm_type: z.string().optional(),
//   farm_product: z.string().optional(),
//   harvest_date: z.date().optional(),
//   status: z.nativeEnum(Status).default(Status.PENDING).optional(),

//     street: z.string().optional(),
//     city: z.string().optional(),
//     state: z.string().optional(),
//     postalCode: z.string().optional(),
//     country: z.string().optional(),

// });

// export type UpdateFarmerInput = TypeOf<typeof farmerSchema>;

// export type FarmerInput = z.infer<typeof FarmerSchema>["body"];
