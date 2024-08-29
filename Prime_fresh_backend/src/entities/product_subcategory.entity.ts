import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import Model from "./model.entity";
import { ProductCategory } from "./product_category.entity";
import { Product } from "./product.entity";

@Entity("product_subcategory")
export class ProductSubcategory extends Model {
  @Column()
  name: string;

  @ManyToOne(() => ProductCategory, (category) => category.subcategories)
  category: ProductCategory;

  @OneToMany(() => Product, (product) => product.subcategory)
  products: Product[];
}
