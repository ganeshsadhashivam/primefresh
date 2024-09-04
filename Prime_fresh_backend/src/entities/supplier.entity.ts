import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import Model from "./model.entity";

@Entity("supplier")
export class Supplier extends Model {
  @Column({ type: "varchar", length: 255 })
  partyName: string;

  @Column({ type: "date", nullable: true })
  inFAndVBusinessSince: Date;

  @Column({ type: "varchar", length: 255 })
  contactPerson: string;

  @Column({ type: "varchar", length: 20 })
  contactNumber: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  alternateContactNumber: string;

  @Column({ type: "text", nullable: true })
  officeAddress: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  officeLandlineNumber: string;

  @Column({ type: "text", nullable: true })
  mainProductsToBeSupplied: string;

  @Column({ type: "text", nullable: true })
  listOfAllProducts: string;

  @Column({ type: "text", nullable: true })
  dispatchCenter: string;

  @Column({ type: "text", nullable: true })
  warehouseLocations: string;

  @Column({ type: "text", nullable: true })
  packingCenterLocation: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  PANNumber: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  TradeLicenseNumber: string;

  @Column({ type: "text", nullable: true })
  proposedPaymentTerms: string;

  @Column({ type: "text", nullable: true })
  anyOtherDetailsRegardingTeamAndInfrastructure: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  submittedBy: string;
}
