import { Entity, Column, ManyToOne } from "typeorm";
import Model from "./model.entity";
import { UOM } from "./uom.entity";

@Entity("UOM_conversion_matrix")
export class UOMConversionMatrix extends Model {
  @ManyToOne(() => UOM, { nullable: false })
  fromUOM: UOM;

  @ManyToOne(() => UOM, { nullable: false })
  toUOM: UOM;

  @Column({ type: "decimal", precision: 10, scale: 4 })
  conversionFactor: number;
}
