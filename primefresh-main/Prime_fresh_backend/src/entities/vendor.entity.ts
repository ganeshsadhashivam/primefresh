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
  @Column("character varying", {
    name: "business_name",
    unique: true,
    length: 40,
  })
  name: string;

  // @Column("character varying", { name: "contact_name", length: 40 })
  // contactname: string;

  // @Column("character varying", { name: "contact_phone", length: 40 })
  // contactphone: string;

  @Column("character varying", { name: "email", length: 100, unique: true })
  email: string;

  @Column("character varying", { name: "gstn", length: 40 })
  gstn: string;

  @Column("text", { name: "description", nullable: true })
  description: string;

  @Column("character varying", { name: "website", length: 100, nullable: true })
  website: string;

  // @Column("character varying", {
  //   name: "vendor_code",
  //   length: 20,
  //   unique: true,
  // })
  // vendorCode: string;
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
    name: "p_mobile_no",
    length: 15,
    nullable: true,
  })
  pMobileNo: string;

  @Column("character varying", {
    name: "c_mobile_no",
    length: 15,
    nullable: true,
  })
  cMobileNo: string;

  @Column("character varying", {
    name: "c_first_name",
    length: 40,
    nullable: true,
  })
  cFirstName: string;

  @Column("character varying", {
    name: "c_middle_name",
    length: 40,
    nullable: true,
  })
  cMiddleName: string;

  @Column("character varying", {
    name: "c_last_name",
    length: 40,
    nullable: true,
  })
  cLastName: string;

  @Column("date", { name: "date_of_incorporation", nullable: true })
  dateOfIncorporation: Date;

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
}

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
