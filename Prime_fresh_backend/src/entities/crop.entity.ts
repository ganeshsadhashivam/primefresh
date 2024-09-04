import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Farmer } from "./farmer.entity";
import Model from "./model.entity";

@Entity("crop")
export class Crop extends Model {
  @Column("character varying", { length: 100 })
  crop: string;

  @Column("character varying", { length: 100, nullable: true })
  variety: string;

  @Column("integer", { nullable: true })
  noOfPlants: number;

  @Column("date", { nullable: true })
  pruningDate: Date;

  @Column("date", { nullable: true })
  expectedHarvestDate: Date;

  @Column("decimal", { precision: 10, scale: 2, nullable: true })
  expectedQuantityInTonnes: number;

  @ManyToOne(() => Farmer, (farmer) => farmer.crops)
  farmer: Farmer;
}
