// src/services/product_classification.service.ts
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { DataSource } from "typeorm";
import { ProductClassificationRepository } from "../repositories/product_classification.repository";
import { ProductClassification } from "../entities/product_classification.entity";

@injectable()
export class ProductClassificationService {
  private productClassificationRepository: ProductClassificationRepository;

  constructor(@inject(TYPES.DataSource) private dataSource: DataSource) {
    this.productClassificationRepository = this.dataSource.getRepository(ProductClassification) as ProductClassificationRepository;
  }

  async findAll(): Promise<ProductClassification[]> {
    // return this.productClassificationRepository.find({
    //   relations: ["categories"], // Load related entities
    // });
    return this.productClassificationRepository.find()
  }

  async findById(id: string): Promise<ProductClassification | null> {
    return this.productClassificationRepository.findOne({
      where: { id },
      relations: ["categories"], // Load related entities
    });
  }
  async getById(id: string): Promise<ProductClassification | null> {
    return this.productClassificationRepository.findOne({
      where: { id },
       // Load related entities
    });
  }
  async create(productClassificationData: Partial<ProductClassification>): Promise<ProductClassification> {
    const productClassification = this.productClassificationRepository.create(productClassificationData);
    return this.productClassificationRepository.save(productClassification);
  }

  async update(id: string, productClassificationData: Partial<ProductClassification>): Promise<ProductClassification | null> {
    const existingProductClassification = await this.productClassificationRepository.findOneBy({ id });
    if (existingProductClassification) {
      Object.assign(existingProductClassification, productClassificationData);
      return this.productClassificationRepository.save(existingProductClassification);
    }
    return null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.productClassificationRepository.delete(id);
    return result.affected !== 0;
  }
}
