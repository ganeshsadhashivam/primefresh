import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import Model from "./model.entity";

import { ProductSubcategory } from "./product_subcategory.entity";
import { Product } from "./product.entity";
import { ProductClassification } from "./product_classification.entity";

@Entity("product_category")
export class ProductCategory extends Model {
  @Column()
  name: string;

  @ManyToOne(() => ProductClassification, (classifications) => classifications.categories)
  classifications: ProductClassification;

  @OneToMany(() => ProductSubcategory, (subcategory) => subcategory.category)
  subcategories: ProductSubcategory[];

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
