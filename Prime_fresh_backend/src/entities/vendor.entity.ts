import {
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from "typeorm";
import Model from "./model.entity";
import { VendorSubcategory } from "./vendorSubcategory.entity";
import { Address } from "./address.entity";
import { VendorCategory } from "./vendorCategory.entity";
import { Status } from "../utils/status.enum";

@Entity("vendor")
export class Vendor extends Model {
  // Existing fields
  @Column("character varying", {
    name: "party_name",
    unique: true,
    length: 40,
    nullable: true,
  })
  partyName: string;

  @Column("character varying", { name: "email", length: 100, unique: true })
  email: string;

  @Column("character varying", { name: "gstn", length: 40 })
  gstn: string;

  @Column("text", { name: "description", nullable: true })
  description: string;

  @Column("character varying", { name: "website", length: 100, nullable: true })
  website: string;

  @Column("character varying", {
    name: "vendor_code",
    length: 20,
    unique: true,
    nullable: true,
  })
  vendorCode: string;

  @Column("character varying", {
    name: "vendor_grade",
    length: 10,
    nullable: true,
  })
  vendorGrade: string;

  @Column("character varying", {
    name: "registered_by",
    length: 100,
    nullable: true,
  })
  registeredBy: string;

  @Column("date", { name: "registered_date", nullable: true })
  registeredDate: Date;

  @Column("character varying", {
    name: "for_which_product",
    length: 100,
    nullable: true,
  })
  forWhichProduct: string;

  @Column("character varying", {
    name: "contact_person_first_name",
    length: 40,
    nullable: true,
  })
  contactPersonFirstName: string;

  @Column("character varying", {
    name: "contact_person_middle_name",
    length: 40,
    nullable: true,
  })
  contactPersonMiddleName: string;

  @Column("character varying", {
    name: "contact_person_last_name",
    length: 40,
    nullable: true,
  })
  contactPersonLastName: string;

  @Column("date", { name: "date_of_incorporation", nullable: true })
  dateOfIncorporation: Date;

  @Column("character varying", {
    name: "in_f_and_v_business_since",
    length: 40,
    nullable: true,
  })
  inFandVBusinessSince: string;

  @Column("character varying", {
    name: "primary_contact_number",
    length: 15,
    nullable: true,
  })
  primaryContactNumber: string;

  @Column("character varying", {
    name: "alternate_contact_number",
    length: 15,
    nullable: true,
  })
  alternateContactNumber: string;

  @Column("text", {
    name: "office_address",
    nullable: true,
  })
  officeAddress: string;

  @Column("character varying", {
    name: "office_landline_number",
    length: 15,
    nullable: true,
  })
  officeLandlineNumber: string;

  @Column("text", {
    name: "main_products_to_be_supplied",
    nullable: true,
  })
  mainProductsToBeSupplied: string;

  @Column("text", {
    name: "list_of_all_products",
    nullable: true,
  })
  listOfAllProducts: string;

  @Column("character varying", {
    name: "dispatch_center",
    length: 100,
    nullable: true,
  })
  dispatchCenter: string;

  @Column("text", {
    name: "warehouse_locations",
    nullable: true,
  })
  warehouseLocations: string;

  @Column("text", {
    name: "packing_center_location",
    nullable: true,
  })
  packingCenterLocation: string;

  @Column("character varying", {
    name: "pan_number",
    length: 20,
    nullable: true,
  })
  PANNumber: string;

  @Column("character varying", {
    name: "trade_license_number",
    length: 20,
    nullable: true,
  })
  tradeLicenseNumber: string;

  @Column("text", {
    name: "proposed_license_terms",
    nullable: true,
  })
  proposedLicenseTerms: string;

  @Column("text", {
    name: "any_other_details_regarding_team_and_infrastructure",
    nullable: true,
  })
  anyOtherDetailsRegardingTeamAndInfrastructure: string;

  @Column("character varying", {
    name: "submitted_by",
    length: 100,
    nullable: true,
  })
  submittedBy: string;

  @OneToOne(() => Address, (address) => address.vendor, { cascade: true })
  @JoinColumn()
  address: Address;

  @Column({
    type: "enum",
    enum: Status,
    default: Status.PENDING,
    name: "status",
  })
  status: Status;

  @ManyToOne(() => VendorSubcategory, (subcategory) => subcategory.vendors)
  subcategory: VendorSubcategory;

  @ManyToOne(() => VendorCategory, (category) => category.vendorSubcategories)
  category: VendorCategory;

  // New fields
  @Column("character varying", {
    name: "ref_one_first_name",
    length: 40,
    nullable: true,
  })
  refOneFName: string;

  @Column("character varying", {
    name: "ref_one_middle_name",
    length: 40,
    nullable: true,
  })
  refOneMName: string;

  @Column("character varying", {
    name: "ref_one_last_name",
    length: 40,
    nullable: true,
  })
  refOneLName: string;

  @Column("character varying", {
    name: "ref_one_alternate_contact_number",
    length: 15,
    nullable: true,
  })
  refOneAltrCNumb: string;

  @Column("text", {
    name: "ref_address",
    nullable: true,
  })
  refAddress: string;

  @Column("character varying", {
    name: "ref_email",
    length: 100,
    nullable: true,
  })
  refEmail: string;
}

//changes made for omkar updates
// import {
//   Column,
//   Entity,
//   OneToMany,
//   ManyToOne,
//   OneToOne,
//   JoinColumn,
// } from "typeorm";
// import Model from "./model.entity";
// import { VendorSubcategory } from "./vendorSubcategory.entity";
// import { Address } from "./address.entity";
// import { VendorCategory } from "./vendorCategory.entity";
// import { Status } from "../utils/status.enum";

// @Entity("vendor")
// export class Vendor extends Model {
//   @Column("character varying", {
//     name: "party_name",
//     unique: true,
//     length: 40,
//     nullable: true,
//   })
//   partyName: string;

//   @Column("character varying", { name: "email", length: 100, unique: true })
//   email: string;

//   @Column("character varying", { name: "gstn", length: 40 })
//   gstn: string;

//   @Column("text", { name: "description", nullable: true })
//   description: string;

//   @Column("character varying", { name: "website", length: 100, nullable: true })
//   website: string;

//   @Column("character varying", {
//     name: "vendor_code",
//     length: 20,
//     unique: true,
//     nullable: true,
//   })
//   vendorCode: string;

//   @Column("character varying", {
//     name: "vendor_grade",
//     length: 10,
//     nullable: true,
//   })
//   vendorGrade: string;

//   @Column("character varying", {
//     name: "registered_by",
//     length: 100,
//     nullable: true,
//   })
//   registeredBy: string;

//   @Column("date", { name: "registered_date", nullable: true })
//   registeredDate: Date;

//   @Column("character varying", {
//     name: "for_which_product",
//     length: 100,
//     nullable: true,
//   })
//   forWhichProduct: string;

//   @Column("character varying", {
//     name: "contact_person_first_name",
//     length: 40,
//     nullable: true,
//   })
//   contactPersonFirstName: string;

//   @Column("character varying", {
//     name: "contact_person_middle_name",
//     length: 40,
//     nullable: true,
//   })
//   contactPersonMiddleName: string;

//   @Column("character varying", {
//     name: "contact_person_last_name",
//     length: 40,
//     nullable: true,
//   })
//   contactPersonLastName: string;

//   @Column("date", { name: "date_of_incorporation", nullable: true })
//   dateOfIncorporation: Date;

//   @Column("character varying", {
//     name: "in_f_and_v_business_since",
//     length: 40,
//     nullable: true,
//   })
//   inFandVBusinessSince: string;

//   @Column("character varying", {
//     name: "primary_contact_number",
//     length: 15,
//     nullable: true,
//   })
//   primaryContactNumber: string;

//   @Column("character varying", {
//     name: "alternate_contact_number",
//     length: 15,
//     nullable: true,
//   })
//   alternateContactNumber: string;

//   @Column("text", {
//     name: "office_address",
//     nullable: true,
//   })
//   officeAddress: string;

//   @Column("character varying", {
//     name: "office_landline_number",
//     length: 15,
//     nullable: true,
//   })
//   officeLandlineNumber: string;

//   @Column("text", {
//     name: "main_products_to_be_supplied",
//     nullable: true,
//   })
//   mainProductsToBeSupplied: string;

//   @Column("text", {
//     name: "list_of_all_products",
//     nullable: true,
//   })
//   listOfAllProducts: string;

//   @Column("character varying", {
//     name: "dispatch_center",
//     length: 100,
//     nullable: true,
//   })
//   dispatchCenter: string;

//   @Column("text", {
//     name: "warehouse_locations",
//     nullable: true,
//   })
//   warehouseLocations: string;

//   @Column("text", {
//     name: "packing_center_location",
//     nullable: true,
//   })
//   packingCenterLocation: string;

//   @Column("character varying", {
//     name: "pan_number",
//     length: 20,
//     nullable: true,
//   })
//   PANNumber: string;

//   @Column("character varying", {
//     name: "trade_license_number",
//     length: 20,
//     nullable: true,
//   })
//   tradeLicenseNumber: string;

//   @Column("text", {
//     name: "proposed_license_terms",
//     nullable: true,
//   })
//   proposedLicenseTerms: string;

//   @Column("text", {
//     name: "any_other_details_regarding_team_and_infrastructure",
//     nullable: true,
//   })
//   anyOtherDetailsRegardingTeamAndInfrastructure: string;

//   @Column("character varying", {
//     name: "submitted_by",
//     length: 100,
//     nullable: true,
//   })
//   submittedBy: string;

//   @OneToOne(() => Address, (address) => address.vendor, { cascade: true })
//   @JoinColumn()
//   address: Address;

//   @Column({
//     type: "enum",
//     enum: Status,
//     default: Status.PENDING,
//     name: "status",
//   })
//   status: Status;

//   @ManyToOne(() => VendorSubcategory, (subcategory) => subcategory.vendors)
//   subcategory: VendorSubcategory;

//   @ManyToOne(() => VendorCategory, (category) => category.vendorSubcategories)
//   category: VendorCategory;
// }

//for fields changes this is commented on 3-9-24c 2.38pm
// import {
//   Column,
//   Entity,
//   OneToMany,
//   ManyToOne,
//   OneToOne,
//   JoinColumn,
// } from "typeorm";
// import Model from "./model.entity";
// import { VendorSubcategory } from "./vendorSubcategory.entity";
// import { Address } from "./address.entity";
// import { VendorCategory } from "./vendorCategory.entity";
// import { Status } from "../utils/status.enum";

// @Entity("vendor")
// export class Vendor extends Model {
//   @Column("character varying", {
//     name: "business_name",
//     unique: true,
//     length: 40,
//   })
//   name: string;

//   // @Column("character varying", { name: "contact_name", length: 40 })
//   // contactname: string;

//   // @Column("character varying", { name: "contact_phone", length: 40 })
//   // contactphone: string;

//   @Column("character varying", { name: "email", length: 100, unique: true })
//   email: string;

//   @Column("character varying", { name: "gstn", length: 40 })
//   gstn: string;

//   @Column("text", { name: "description", nullable: true })
//   description: string;

//   @Column("character varying", { name: "website", length: 100, nullable: true })
//   website: string;

//   // @Column("character varying", {
//   //   name: "vendor_code",
//   //   length: 20,
//   //   unique: true,
//   // })
//   // vendorCode: string;
//   @Column("character varying", {
//     name: "vendor_code",
//     length: 20,
//     unique: true,
//     nullable: true,
//   })
//   vendorCode: string;

//   @Column("character varying", {
//     name: "vendor_grade",
//     length: 10,
//     nullable: true,
//   })
//   vendorGrade: string;

//   @Column("character varying", {
//     name: "registered_by",
//     length: 100,
//     nullable: true,
//   })
//   registeredBy: string;

//   @Column("date", { name: "registered_date", nullable: true })
//   registeredDate: Date;

//   @Column("character varying", {
//     name: "for_which_product",
//     length: 100,
//     nullable: true,
//   })
//   forWhichProduct: string;

//   @Column("character varying", {
//     name: "p_mobile_no",
//     length: 15,
//     nullable: true,
//   })
//   pMobileNo: string;

//   @Column("character varying", {
//     name: "c_mobile_no",
//     length: 15,
//     nullable: true,
//   })
//   cMobileNo: string;

//   @Column("character varying", {
//     name: "c_first_name",
//     length: 40,
//     nullable: true,
//   })
//   cFirstName: string;

//   @Column("character varying", {
//     name: "c_middle_name",
//     length: 40,
//     nullable: true,
//   })
//   cMiddleName: string;

//   @Column("character varying", {
//     name: "c_last_name",
//     length: 40,
//     nullable: true,
//   })
//   cLastName: string;

//   @Column("date", { name: "date_of_incorporation", nullable: true })
//   dateOfIncorporation: Date;

//   @OneToOne(() => Address, (address) => address.vendor, { cascade: true })
//   @JoinColumn()
//   address: Address;

//   @Column({
//     type: "enum",
//     enum: Status,
//     default: Status.PENDING,
//     name: "status",
//   })
//   status: Status;

//   @ManyToOne(() => VendorSubcategory, (subcategory) => subcategory.vendors)
//   subcategory: VendorSubcategory;

//   @ManyToOne(() => VendorCategory, (category) => category.vendorSubcategories)
//   category: VendorCategory;
// }

// import { Column, Entity, OneToMany, ManyToOne, OneToOne, JoinColumn } from "typeorm";

// import Model from "./model.entity";

// import { VendorSubcategory } from "./vendorSubcategory.entity";
// import { Address } from "./address.entity";
// import { VendorCategory } from "./vendorCategory.entity";
// import { Status } from "../utils/status.enum";

// @Entity("vendor")
// export class Vendor extends Model {
//   @Column("character varying", {
//     name: "business_name",
//     unique: true,
//     length: 40,
//   })
//   name: string;

//   @Column("character varying", { name: "contact_name", length: 40 })
//   contactname: string;

//   @Column("character varying", { name: "contact_phone", length: 40 })
//   contactphone: string;

//   @Column("character varying", { name: "email", length: 100, unique: true })
//   email: string; // Added email field with unique constraint
//   @Column("character varying", { name: "gstn", length: 40 })
//   gstn: string;

//   @Column("text", { name: "description", nullable: true })
//   description: string;

//   @Column("character varying", { name: "website", length: 100, nullable: true })
//   website: string;
//   @OneToOne(() => Address, (address) => address.vendor, { cascade: true })
//   @JoinColumn()
//   address: Address; // Establish one-to-many relationship with Address entity

//   @Column({
//     type: "enum",
//     enum: Status,
//     default: Status.PENDING,
//     name: "status",
//   })
//   status: Status;
//   @ManyToOne(() => VendorSubcategory, (subcategory) => subcategory.vendors)
//   subcategory: VendorSubcategory;
//   @ManyToOne(() => VendorCategory, (category) => category.vendorSubcategories)
//   category: VendorCategory;
// }
