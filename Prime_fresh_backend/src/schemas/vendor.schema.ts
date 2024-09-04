// import { array, object, string, z } from "zod";
// import { addressSchema } from "./user.schema";

// // Define the status enum
// const VendorStatusEnum = z.enum([
//   "pending",
//   "approved",
//   "rejected",
//   "inactive",
//   "suspended",
//   "under_review",
// ]);

// export const CreateVendorSchema = object({
//   body: object({
//     partyName: string({
//       required_error: "Party Name is required",
//     }),
//     email: string({
//       required_error: "Email is required",
//     }).email("Invalid email format"),
//     gstn: string({
//       required_error: "GSTN is required",
//     }),
//     description: string().optional(),
//     website: string().optional(),
//     vendorCode: string().optional(),
//     vendorGrade: string().optional(),
//     registeredBy: string().optional(),
//     registeredDate: string().optional(),
//     forWhichProduct: string().optional(),
//     contactPersonFirstName: string({
//       required_error: "Contact Person First Name is required",
//     }),
//     contactPersonMiddleName: string().optional(),
//     contactPersonLastName: string({
//       required_error: "Contact Person Last Name is required",
//     }),
//     dateOfIncorporation: string().optional(),
//     inFandVBusinessSince: string({
//       required_error: "In F&V Business Since is required",
//     }),
//     primaryContactNumber: string({
//       required_error: "Primary Contact Number is required",
//     }),
//     alternateContactNumber: string().optional(),
//     officeAddress: string({
//       required_error: "Office Address is required",
//     }),
//     officeLandlineNumber: string().optional(),
//     mainProductsToBeSupplied: string({
//       required_error: "Main Products to be Supplied is required",
//     }),
//     listOfAllProducts: string().optional(),
//     dispatchCenter: string().optional(),
//     warehouseLocations: string().optional(),
//     packingCenterLocation: string().optional(),
//     PANNumber: string({
//       required_error: "PAN Number is required",
//     }),
//     tradeLicenseNumber: string({
//       required_error: "Trade License Number is required",
//     }),
//     proposedLicenseTerms: string().optional(),
//     anyOtherDetailsRegardingTeamAndInfrastructure: string().optional(),
//     submittedBy: string({
//       required_error: "Submitted By is required",
//     }),
//     refOneFName: string().optional(),
//     refOneMName: string().optional(),
//     refOneLName: string().optional(),
//     refOneAltrCNumb: string().optional(),
//     refAddress: string().optional(),
//     refEmail: string().optional(),
//     address: addressSchema,
//     categoryId: string({
//       required_error: "Category ID is required",
//     }),
//     status: VendorStatusEnum.optional(),
//     subcategoryId: string({
//       required_error: "Subcategory ID is required",
//     }),
//   }),
// });

// export type CreateVendorInput = z.infer<typeof CreateVendorSchema>["body"];

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
    partyName: string({
      required_error: "Party Name is required",
    }),
    contactPersonFirstName: string({
      required_error: "Contact Person First Name is required",
    }),
    contactPersonMiddleName: string().optional(),
    contactPersonLastName: string({
      required_error: "Contact Person Last Name is required",
    }),
    inFandVBusinessSince: string({
      required_error: "In F&V Business Since is required",
    }),
    primaryContactNumber: string({
      required_error: "Primary Contact Number is required",
    }),
    alternateContactNumber: string().optional(),
    officeAddress: string({
      required_error: "Office Address is required",
    }),
    officeLandlineNumber: string().optional(),
    mainProductsToBeSupplied: string({
      required_error: "Main Products to be Supplied is required",
    }),
    listOfAllProducts: string().optional(),
    dispatchCenter: string().optional(),
    warehouseLocations: string().optional(),
    packingCenterLocation: string().optional(),
    PANNumber: string({
      required_error: "PAN Number is required",
    }),
    tradeLicenseNumber: string({
      required_error: "Trade License Number is required",
    }),
    proposedLicenseTerms: string().optional(),
    anyOtherDetailsRegardingTeamAndInfrastructure: string().optional(),
    submittedBy: string({
      required_error: "Submitted By is required",
    }),
    refOneFName: string().optional(),
    refOneMName: string().optional(),
    refOneLName: string().optional(),
    refOneAltrCNumb: string().optional(),
    refAddress: string().optional(),
    refEmail: string().optional(),
    address: addressSchema,
    categoryId: string(),
    status: VendorStatusEnum.optional(),
    subcategoryId: string(),
  }),
});

export type CreateVendorInput = z.infer<typeof CreatevendorSchema>["body"];
