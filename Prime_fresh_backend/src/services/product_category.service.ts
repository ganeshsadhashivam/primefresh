import { inject, injectable } from "inversify";

import { DataSource } from "typeorm";

import { TYPES } from "../types";
import { ProductCategoryRepository } from "../repositories/product_category.repository";
import { ProductCategory } from "../entities/product_category.entity";
import { ProductClassification } from "../entities/product_classification.entity";
import { ProductClassificationRepository } from "../repositories/product_classification.repository";
import { CreateProductCategoryDTO } from "../dtos/product-category.dto";

@injectable()
export class ProductCategoryService {
  private productCategoryRepository: ProductCategoryRepository;
  private productClassificationRepository: ProductClassificationRepository;
  constructor(@inject(TYPES.DataSource) private dataSource: DataSource) {
    this.productCategoryRepository = this.dataSource.getRepository(
      ProductCategory
    ) as ProductCategoryRepository;

    this.productClassificationRepository = this.dataSource.getRepository(
      ProductClassification
    ) as ProductClassificationRepository;
  }

  async getAll(): Promise<ProductCategory[]> {
    return this.productCategoryRepository.find({
     
    });
  }

  async getById(id: string): Promise<ProductCategory | null> {
    return this.productCategoryRepository.findOne({
      where: { id },
      
    });
  }

  
  async create(data: CreateProductCategoryDTO): Promise<ProductCategory> {
   // Find the ProductClassification entity by ID
  const productClassification = await this.productClassificationRepository.findOneBy({
    id: data.productClassificationId
  });

  if (!productClassification) {
    throw new Error('Product Classification not found');
  }
 
    const productCategory = this.productCategoryRepository.create({
      name:data.name,
      classifications:productClassification
      
      
    });

    return this.productCategoryRepository.save(productCategory);
  }


  async update(id: string, name: string): Promise<ProductCategory | null> {
    const category = await this.productCategoryRepository.findOne({
      where: { id },
    });
    if (category) {
      category.name = name;
      return this.productCategoryRepository.save(category);
    }
    return null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.productCategoryRepository.delete(id);
    return result.affected !== 0;
  }
}
