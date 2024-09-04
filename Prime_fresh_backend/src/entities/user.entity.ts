//in this crypto used that is two way algorithm encryption and decryption is possible with that
// import {
//   Entity,
//   Column,
//   BeforeInsert,
//   OneToOne,
//   JoinColumn,
//   ManyToOne,
// } from "typeorm";
// import crypto from "crypto";
// import Model from "./model.entity";
// import { Address } from "./address.entity";
// import { Role } from "./role.entity";

// // Define the Status enums
// export enum Status {
//   PENDING = "pending",
//   APPROVED = "approved",
// }

// export enum EmployeeStatus {
//   ACTIVE = "active",
//   INACTIVE = "inactive",
// }

// @Entity("employees")
// export class User extends Model {
//   @Column({ nullable: true })
//   firstName: string;

//   @Column({ nullable: true })
//   middleName: string;

//   @Column({ nullable: true })
//   lastName: string;

//   @Column({ nullable: true })
//   username: string;

//   @Column({ nullable: true })
//   phoneNumber: string;

//   @Column({ unique: true, nullable: true })
//   email: string;

//   @Column({ nullable: true })
//   companyEmail: string;

//   @Column({ nullable: true })
//   designation: string;

//   @Column({ nullable: true })
//   password: string;

//   @ManyToOne(() => Role, (role) => role.users, { nullable: true })
//   @JoinColumn({ name: "roleId" })
//   role: Role;

//   @Column({ nullable: true })
//   employeeCode: string;

//   @Column({ type: "date", nullable: true })
//   joiningDate: Date;

//   @Column({ type: "date", nullable: true })
//   relocationDate: Date;

//   @Column({ nullable: true })
//   relocationPlace: string;

//   @OneToOne(() => Address, (address) => address.user, {
//     cascade: true,
//     nullable: true,
//   })
//   @JoinColumn()
//   address: Address;

//   @Column({
//     type: "enum",
//     enum: Status,
//     default: Status.PENDING,
//   })
//   status: Status;

//   @Column({
//     type: "enum",
//     enum: EmployeeStatus,
//     default: EmployeeStatus.INACTIVE,
//   })
//   employeeStatus: EmployeeStatus;

//   @Column({ nullable: true })
//   recommendedBy: string;

//   @Column({ nullable: true })
//   cugNo: string;

//   // New columns for reporting authority
//   @Column({ nullable: true })
//   reportingAuthorityAdministrative: string;

//   @Column({ nullable: true })
//   reportingAuthorityFunctional: string;

//   // Method to encrypt and set the password
//   async setPassword(rawPassword: string) {
//     this.password = this.encryptPassword(rawPassword);
//   }

//   // Encrypt password
//   private encryptPassword(password: string): string {
//     const cipher = crypto.createCipheriv(
//       "aes-256-cbc",
//       Buffer.from("your-secret-key-here", "utf8"),
//       Buffer.from("your-init-vector", "utf8")
//     );
//     let encrypted = cipher.update(password, "utf8", "hex");
//     encrypted += cipher.final("hex");
//     return encrypted;
//   }

//   // Decrypt password
//   private decryptPassword(encryptedPassword: string): string {
//     const decipher = crypto.createDecipheriv(
//       "aes-256-cbc",
//       Buffer.from("your-secret-key-here", "utf8"),
//       Buffer.from("your-init-vector", "utf8")
//     );
//     let decrypted = decipher.update(encryptedPassword, "hex", "utf8");
//     decrypted += decipher.final("utf8");
//     return decrypted;
//   }

//   // Compare passwords
//   async comparePasswords(candidatePassword: string) {
//     const decryptedPassword = this.decryptPassword(this.password);
//     return candidatePassword === decryptedPassword;
//   }

//   toJSON() {
//     return { ...this, password: undefined, verified: undefined };
//   }
// }

//in this code bcrypt is used that is one way decryption algorithm

import {
  Entity,
  Column,
  BeforeInsert,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import bcrypt from "bcryptjs";
import Model from "./model.entity";
import { Address } from "./address.entity";
import { Role } from "./role.entity";
import { Status } from "../utils/status.enum";

// Define the Status enums
// export enum Status {
//   PENDING = "pending",
//   APPROVED = "approved",
// }

export enum EmployeeStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

@Entity("employees")
export class User extends Model {
  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  middleName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ nullable: true })
  companyEmail: string;

  @Column({ nullable: true })
  designation: string;

  @Column({ nullable: true })
  password: string;

  @ManyToOne(() => Role, (role) => role.users, { nullable: true })
  @JoinColumn({ name: "roleId" })
  role: Role;

  @Column({ nullable: true })
  employeeCode: string;

  @Column({ type: "date", nullable: true })
  joiningDate: Date;

  @Column({ type: "date", nullable: true })
  relocationDate: Date;

  @Column({ nullable: true })
  relocationPlace: string;

  @OneToOne(() => Address, (address) => address.user, {
    cascade: true,
    nullable: true,
  })
  @JoinColumn()
  address: Address;

  @Column({
    type: "enum",
    enum: Status,
    default: Status.PENDING,
  })
  status: Status;

  @Column({
    type: "enum",
    enum: EmployeeStatus,
    default: EmployeeStatus.INACTIVE,
  })
  employeeStatus: EmployeeStatus;

  @Column({ nullable: true })
  recommendedBy: string;

  @Column({ nullable: true })
  cugNo: string;

  // New columns for reporting authority
  @Column({ nullable: true })
  reportingAuthorityAdministrative: string;

  @Column({ nullable: true })
  reportingAuthorityFunctional: string;

  // Method to hash and set the password
  async setPassword(rawPassword: string) {
    this.password = await bcrypt.hash(rawPassword, 12);
  }

  static async comparePasswords(
    candidatePassword: string,
    hashedPassword: string
  ) {
    if (!candidatePassword || !hashedPassword) {
      throw new Error("Invalid candidate or hashed password");
    }
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }

  toJSON() {
    return { ...this, password: undefined, verified: undefined };
  }
}

// import {
//   Entity,
//   Column,
//   BeforeInsert,
//   OneToOne,
//   JoinColumn,
//   ManyToOne,
// } from "typeorm";
// import bcrypt from "bcryptjs";
// import Model from "./model.entity";
// import { Address } from "./address.entity";
// import { Role } from "./role.entity";

// // Define the Status enums
// export enum Status {
//   PENDING = "pending",
//   APPROVED = "approved",
// }

// export enum EmployeeStatus {
//   ACTIVE = "active",
//   INACTIVE = "inactive",
// }

// @Entity("employees")
// export class User extends Model {
//   @Column({ nullable: true })
//   firstName: string;

//   @Column({ nullable: true })
//   middleName: string;

//   @Column({ nullable: true })
//   lastName: string;

//   @Column({ nullable: true })
//   username: string;

//   @Column({ nullable: true })
//   phoneNumber: string;

//   @Column({ unique: true, nullable: true })
//   email: string;

//   @Column({ nullable: true })
//   companyEmail: string;

//   @Column({ nullable: true })
//   designation: string;

//   @Column({ nullable: true })
//   password: string;

//   @ManyToOne(() => Role, (role) => role.users, { nullable: true })
//   @JoinColumn({ name: "roleId" })
//   role: Role;

//   @Column({ nullable: true })
//   employeeId: string;

//   @Column({ type: "date", nullable: true })
//   joiningDate: Date;

//   @Column({ type: "date", nullable: true })
//   relocationDate: Date;

//   @Column({ nullable: true })
//   relocationPlace: string;

//   @OneToOne(() => Address, (address) => address.user, {
//     cascade: true,
//     nullable: true,
//   })
//   @JoinColumn()
//   address: Address;

//   @Column({
//     type: "enum",
//     enum: Status,
//     default: Status.PENDING,
//   })
//   status: Status;

//   @Column({
//     type: "enum",
//     enum: EmployeeStatus,
//     default: EmployeeStatus.INACTIVE,
//   })
//   employeeStatus: EmployeeStatus;

//   @Column({ nullable: true })
//   recommendedBy: string;

//   @Column({ nullable: true })
//   cugNo: string;

//   // Method to hash and set the password
//   async setPassword(rawPassword: string) {
//     this.password = await bcrypt.hash(rawPassword, 12);
//   }

//   static async comparePasswords(
//     candidatePassword: string,
//     hashedPassword: string
//   ) {
//     if (!candidatePassword || !hashedPassword) {
//       throw new Error("Invalid candidate or hashed password");
//     }
//     return await bcrypt.compare(candidatePassword, hashedPassword);
//   }

//   toJSON() {
//     return { ...this, password: undefined, verified: undefined };
//   }
// }

// import {
//   Entity,
//   Column,
//   BeforeInsert,
//   PrimaryGeneratedColumn,
//   OneToOne,
//   JoinColumn,
//   ManyToOne,
// } from "typeorm";
// import "reflect-metadata";
// import bcrypt from "bcryptjs";
// import Model from "./model.entity";
// import { Address } from "./address.entity";
// import { Role } from "./role.entity";

// // Define the Status enums
// export enum Status {
//   PENDING = "pending",
//   APPROVED = "approved",
// }

// export enum EmployeeStatus {
//   ACTIVE = "active",
//   INACTIVE = "inactive",
// }

// @Entity("employees")
// export class User extends Model {
//   @Column({ nullable: true })
//   firstName: string;

//   @Column({ nullable: true })
//   middleName: string; // New middle name field

//   @Column({ nullable: true })
//   lastName: string;

//   @Column({ nullable: true })
//   username: string;

//   @Column({ nullable: true })
//   phoneNumber: string;

//   @Column({ unique: true, nullable: true })
//   email: string;

//   @Column({ nullable: true })
//   companyEmail: string; // New company email field

//   @Column({ nullable: true })
//   designation: string; // New designation field

//   @Column({ nullable: true })
//   password: string; // Password field should be nullable initially

//   @ManyToOne(() => Role, (role) => role.users, { nullable: true })
//   @JoinColumn({ name: "roleId" })
//   role: Role;

//   @Column({ nullable: true })
//   employeeId: string; // Employee ID should be nullable initially

//   @Column({ type: "date", nullable: true })
//   joiningDate: Date;

//   @Column({ type: "date", nullable: true })
//   relocationDate: Date;

//   @Column({ nullable: true })
//   relocationPlace: string;

//   @OneToOne(() => Address, (address) => address.user, {
//     cascade: true,
//     nullable: true,
//   })
//   @JoinColumn() // Specify the join column
//   address: Address; // Should be a single Address

//   @Column({
//     type: "enum",
//     enum: Status,
//     default: Status.PENDING, // Set the default status
//   })
//   status: Status;

//   @Column({
//     type: "enum",
//     enum: EmployeeStatus,
//     default: EmployeeStatus.INACTIVE, // Set the default employee status
//   })
//   employeeStatus: EmployeeStatus;

//   @Column({ nullable: true })
//   recommendedBy: string; // Column to store the recommended by value

//   @Column({ nullable: true })
//   cugNo: string; // New CUG number field

//   // Function to generate a random password
//   private generateRandomPassword(length: number = 8): string {
//     const charset =
//       "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//     let password = "";
//     for (let i = 0; i < length; i++) {
//       const randomIndex = Math.floor(Math.random() * charset.length);
//       password += charset[randomIndex];
//     }
//     return password;
//   }

//   // Method to generate and set employee ID
//   async generateEmployeeID() {
//     const prefix = "PF";
//     let roleChar = "E"; // Default to Employee

//     if (this.role) {
//       if (this.role.name === "Manager") roleChar = "M";
//       else if (this.role.name === "Admin") roleChar = "A";
//     }

//     const lastEmployee = await this.constructor
//       .createQueryBuilder("user")
//       .where("user.employeeId LIKE :prefix", {
//         prefix: `${prefix}${roleChar}%`,
//       })
//       .orderBy("user.employeeId", "DESC")
//       .getOne();

//     const lastIdNumber = lastEmployee
//       ? parseInt(lastEmployee.employeeId.slice(-4), 10)
//       : 0;

//     const newIdNumber = lastIdNumber + 1;
//     this.employeeId = `${prefix}${roleChar}${newIdNumber
//       .toString()
//       .padStart(4, "0")}`;
//   }

//   // Method to hash and set the password
//   async setPassword(rawPassword: string) {
//     this.password = await bcrypt.hash(rawPassword, 12);
//   }

//   // Method to generate a random password and set it
//   async generateAndSetPassword() {
//     const randomPassword = this.generateRandomPassword();
//     await this.setPassword(randomPassword);
//     return randomPassword; // Return the generated password for potential frontend use
//   }

//   static async comparePasswords(
//     candidatePassword: string,
//     hashedPassword: string
//   ) {
//     if (!candidatePassword || !hashedPassword) {
//       throw new Error("Invalid candidate or hashed password");
//     }
//     return await bcrypt.compare(candidatePassword, hashedPassword);
//   }

//   toJSON() {
//     return { ...this, password: undefined, verified: undefined };
//   }
// }

//madhuri code
// import {
//   Entity,
//   Column,
//   BeforeInsert,
//   OneToMany,
//   PrimaryGeneratedColumn,
//   OneToOne,
//   JoinColumn,
//   ManyToOne,
// } from "typeorm";
// import "reflect-metadata";
// import bcrypt from "bcryptjs";
// import Model from "./model.entity";
// import { Address } from "./address.entity";
// import { Role } from "./role.entity";

// // Define the Status enum
// export enum Status {
//   PENDING = "pending",
//   APPROVED = "approved",
//   ACTIVE = "active",
//   INACTIVE = "inactive",
// }

// @Entity("employees")
// export class User extends Model {
//   @Column({ nullable: true })
//   firstName: string;

//   @Column({ nullable: true })
//   lastName: string;

//   @Column({ nullable: true })
//   username: string;

//   @Column({ nullable: true })
//   phoneNumber: string;

//   @Column({ unique: true })
//   email: string;

//   @Column()
//   password: string;

//   @ManyToOne(() => Role, (role) => role.users, { nullable: true })
//   @JoinColumn({ name: "roleId" })
//   role: Role;

//   @Column({ nullable: true })
//   employeeId: string; // Employee ID or unique identifier

//   @Column({ type: "date", nullable: true })
//   joiningDate: Date;

//   @Column({ type: "date", nullable: true })
//   relocationDate: Date;

//   @Column({ nullable: true })
//   relocationPlace: string;

//   @OneToOne(() => Address, (address) => address.user, {
//     cascade: true,
//     nullable: true,
//   })
//   @JoinColumn() // Specify the join column
//   address: Address; // Should be a single Address

//   @Column({
//     type: "enum",
//     enum: Status,
//     default: Status.PENDING, // Set the default status
//   })
//   status: Status;

//   @Column({ nullable: true })
//   recommendedBy: string; // Column to store the recommended by value

//   @BeforeInsert()
//   async hashPassword() {
//     if (this.password) this.password = await bcrypt.hash(this.password, 12);
//   }

//   static async comparePasswords(
//     candidatePassword: string,
//     hashedPassword: string
//   ) {
//     // Ensure both candidatePassword and hashedPassword are not null or undefined
//     if (!candidatePassword || !hashedPassword) {
//       throw new Error("Invalid candidate or hashed password");
//     }

//     // Perform password comparison
//     return await bcrypt.compare(candidatePassword, hashedPassword);
//   }

//   toJSON() {
//     return { ...this, password: undefined, verified: undefined };
//   }
// }

// import {
//   Entity,
//   Column,
//   BeforeInsert,
//   OneToMany,
//   PrimaryGeneratedColumn,
//   OneToOne,
//   JoinColumn,
//   ManyToOne,
// } from "typeorm";
// import 'reflect-metadata';
// import bcrypt from "bcryptjs";
// import Model from "./model.entity";
// import { Address } from "./address.entity";
// import { Role } from "./role.entity";

// @Entity("employees")
// export class User extends Model {
//   @Column({ nullable: true })
//   firstName: string;

//   @Column({ nullable: true })
//   lastName: string;

//   @Column({ nullable: true })
//   username: string;

//   @Column({ nullable: true })
//   phoneNumber: string;

//   @Column({ unique: true })
//   email: string;

//   @Column()
//   password: string;

//   @ManyToOne(() => Role, (role) => role.users, { nullable: true })
//   @JoinColumn({ name: "roleId" })
//   role: Role;

//   @Column({ nullable: true })
//   employeeId: string; // Employee ID or unique identifier

//   @Column({ type: "date", nullable: true })
//   joiningDate: Date;
//   @Column({ type: "date", nullable: true })
//   relocationDate: Date;
//   @Column({ nullable: true })
//   relocationPlace:string
//   @OneToOne(() => Address, (address) => address.user, {
//     cascade: true,
//     nullable: true,
//   })
//   @JoinColumn() // Specify the join column
//   address: Address; // Should be a single Address

//   @BeforeInsert()
//   async hashPassword() {
//     if (this.password) this.password = await bcrypt.hash(this.password, 12);
//   }

//   static async comparePasswords(
//     candidatePassword: string,
//     hashedPassword: string
//   ) {
//     // Ensure both candidatePassword and hashedPassword are not null or undefined
//     if (!candidatePassword || !hashedPassword) {
//       throw new Error("Invalid candidate or hashed password");
//     }

//     // Log or debug the values of candidatePassword and hashedPassword
//     //console.log('Candidate Password:', candidatePassword);
//     //console.log('Hashed Password:', hashedPassword);

//     // Perform password comparison
//     return await bcrypt.compare(candidatePassword, hashedPassword);
//     //return await bcrypt.compare(candidatePassword, hashedPassword);
//   }

//   toJSON() {
//     return { ...this, password: undefined, verified: undefined };
//   }
// }
