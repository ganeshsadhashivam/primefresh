import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from "typeorm";
import Model from "./model.entity";
import { CustomerCategory } from "./customerCategory.entity";
import { CustomerType } from "./customerType.entity";
import { Address } from "./address.entity";
import { Status } from "../utils/status.enum";

@Entity("customers")
export class Customer extends Model {
  // @Column()
  // name: string;

  @ManyToOne(
    () => CustomerCategory,
    (customerCategory) => customerCategory.customers
  )
  customerCategory: CustomerCategory;

  @ManyToOne(() => CustomerType, (customerType) => customerType.customers)
  customerType: CustomerType;

  @Column({ nullable: true })
  business_name: string;

  @Column({ nullable: true })
  email: string;

  @Column({
    type: "enum",
    enum: Status,
    default: Status.PENDING,
    name: "status",
  })
  status: Status;

  @Column({ nullable: true })
  mobile_no: string;

  @Column({ nullable: true })
  notes: string;

  @Column({ nullable: true })
  contact_person: string;

  @OneToOne(() => Address, (address) => address.customer, { cascade: true })
  @JoinColumn()
  address: Address;

  // New fields
  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  middleName: string;

  @Column({ nullable: true })
  accEmail: string;

  @Column({ nullable: true })
  employeeCode: string;

  @Column({ nullable: true })
  manager: string;

  @Column({ type: "date", nullable: true })
  ledgerReconciledDate: Date;

  @Column({ nullable: true })
  referredBy: string;

  @Column({ nullable: true })
  pMobileNo: string;

  @Column({ nullable: true })
  cMobileNo: string;
}

// import { Entity, Column, OneToMany, ManyToOne, OneToOne, JoinColumn } from "typeorm";

// import Model from "./model.entity";
// import { CustomerCategory } from "./customerCategory.entity";
// import { CustomerType } from "./customerType.entity";
// import { Address } from "./address.entity";
// import { Status } from "../utils/status.enum";

// @Entity("customers")
// export class Customer extends Model {
//   @Column()
//   name: string;

//   @ManyToOne(
//     () => CustomerCategory,
//     (customerCategory) => customerCategory.customers
//   )
//   customerCategory: CustomerCategory;

//   @ManyToOne(() => CustomerType, (customerType) => customerType.customers)
//   customerType: CustomerType;

//   @Column({
//     nullable: true,
//   })
//   business_name: string;

//   @Column({
//     nullable: true,
//   })
//   email: string;
//   @Column({
//     type: "enum",
//     enum: Status,
//     default: Status.PENDING,
//     name: "status",
//   })
//   status: Status;
//   @Column({
//     nullable: true,
//   })
//   mobile_no: string;

//   @Column({
//     nullable: true,
//   })
//   notes: string;

//   @Column({
//     nullable: true,
//   })
//   contact_person: string;

//   @OneToOne(() => Address, (address) => address.customer, { cascade: true })
//   @JoinColumn()
//   address: Address; // Establish one-to-many relationship with Address entity
// }
