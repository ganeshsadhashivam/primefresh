import { Repository } from "typeorm";
import { ProductCategory } from "../entities/product_category.entity";

export class ProductCategoryRepository extends Repository<ProductCategory> {}
