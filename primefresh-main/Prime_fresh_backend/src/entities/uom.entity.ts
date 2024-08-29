import { Entity, Column } from "typeorm";
import Model from "./model.entity";

@Entity("uom")
export class UOM extends Model {
  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "varchar", length: 10 })
  abbreviation: string;

  @Column({ type: "text", nullable: true })
  description: string;
}
