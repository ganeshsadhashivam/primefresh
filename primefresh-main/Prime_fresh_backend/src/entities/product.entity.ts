import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import Model from "./model.entity";
import { ProductCategory } from "./product_category.entity";
import { ProductSubcategory } from "./product_subcategory.entity";
import { UOM } from "./uom.entity";

import { ProductClassification } from "./product_classification.entity";

@Entity("product")
export class Product extends Model {
  @Column()
  name: string;

  @Column({nullable:true})
  image: string;
  @ManyToOne(() => ProductClassification, (classification) => classification.products)
  classification: ProductClassification;
  @ManyToOne(() => ProductCategory, (category) => category.products, { nullable: true })
  @JoinColumn({ name: 'categoryId' })
  category: ProductCategory;

  @ManyToOne(() => ProductSubcategory, (subcategory) => subcategory.products, { nullable: true })
  @JoinColumn({ name: 'subcategoryId' })
  subcategory: ProductSubcategory;

  @ManyToOne(() => UOM, { nullable: true })
  @JoinColumn({ name: 'uomId' })
  uom: UOM;

  @Column({ default: false })
  returnable: boolean;

  @Column()
  description: string;

  @Column({ unique: true })
  product_code: string;

  
}
