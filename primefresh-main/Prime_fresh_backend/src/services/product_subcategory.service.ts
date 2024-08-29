import { inject, injectable } from "inversify";
import { DataSource } from "typeorm";
import { TYPES } from "../types";
import { ProductSubcategoryRepository } from "../repositories/product_subcategory.repository";
import { ProductSubcategory } from "../entities/product_subcategory.entity";
import { ProductCategory } from "../entities/product_category.entity";

@injectable()
export class ProductSubcategoryService {
  private productSubcategoryRepository: ProductSubcategoryRepository;

  constructor(@inject(TYPES.DataSource) private dataSource: DataSource) {
    this.productSubcategoryRepository = this.dataSource.getRepository(
      ProductSubcategory
    ) as ProductSubcategoryRepository;
  }

  async getAll(): Promise<ProductSubcategory[]> {
    return this.productSubcategoryRepository.find({
      relations: ["category"], // Ensure category is loaded
    });
  }

  async getById(id: string): Promise<ProductSubcategory | null> {
    return this.productSubcategoryRepository.findOne({
      where: { id },
      relations: ["category"], // Ensure category is loaded
    });
  }

  async create(name: string, categoryId: string): Promise<ProductSubcategory> {
    const subcategory = this.productSubcategoryRepository.create({
      name,
      category: { id: categoryId } as ProductCategory, // Correctly assign the category
    });
    return this.productSubcategoryRepository.save(subcategory);
  }

  async update(
    id: string,
    name: string,
    categoryId: string
  ): Promise<ProductSubcategory | null> {
    const subcategory = await this.productSubcategoryRepository.findOne({
      where: { id },
    });
    if (subcategory) {
      subcategory.name = name;
      subcategory.category = { id: categoryId } as ProductCategory; // Update category
      return this.productSubcategoryRepository.save(subcategory);
    }
    return null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.productSubcategoryRepository.softDelete(id);
    return result.affected !== 0;
  }
}
