import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import Model from "./model.entity";
import { Status } from "../utils/status.enum";
import { Address } from "./address.entity";

@Entity("farmer")
export class Farmer extends Model {
  @Column({ type: "varchar", length: 100 })
  first_name: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  middle_name: string;

  @Column({ type: "varchar", length: 100 })
  last_name: string;

  @Column({ type: "int" })
  age: number;

  @Column({ type: "varchar", length: 10 })
  gender: string;

  @Column({ type: "varchar", length: 15 })
  mobile_no: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  email: string;

  @Column({ type: "varchar", length: 255 })
  farm_location: string;

  @Column({ type: "decimal" })
  land_area_total: number;

  @Column({ type: "varchar", length: 10 })
  total_area_uom: string;

  @Column({ type: "decimal" })
  land_area_cultivation: number;

  @Column({ type: "varchar", length: 10 })
  cultivation_area_uom: string;

  @Column({ type: "varchar", length: 100 })
  irrigation_source: string;

  @Column({ type: "varchar", length: 100 })
  irrigation_type: string;

  @Column({ type: "varchar", length: 100 })
  soil_type: string;

  @Column({ type: "varchar", length: 100 })
  farm_type: string;

  @Column({ type: "varchar", length: 255 })
  farm_product: string;

  @Column({ type: "date" })
  harvest_date: Date;

  @Column({
    type: "enum",
    enum: Status,
    default: Status.PENDING,
    name: "status",
  })
  status: Status;


  @OneToOne(() => Address, { cascade: true, onDelete: "CASCADE" })
  @JoinColumn()
  address: Address; 

}
