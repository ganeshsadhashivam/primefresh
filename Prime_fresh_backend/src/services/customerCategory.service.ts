// customerCategory.service.ts
import { inject, injectable } from "inversify";
import { CustomerCategoryRepository } from "../repositories/customerCategory.repository";
import { CustomerCategory } from "../entities/customerCategory.entity";
import { DataSource } from "typeorm";
import { TYPES } from "../types";

@injectable()
export class CustomerCategoryService {
  private customerCategoryRepository: CustomerCategoryRepository;

  constructor(@inject(TYPES.DataSource) private dataSource: DataSource) {
    this.customerCategoryRepository = this.dataSource.getRepository(
      CustomerCategory
    ) as CustomerCategoryRepository;
  }

  public async getAll(): Promise<CustomerCategory[]> {
    return await this.customerCategoryRepository.find();
  }

  public async getById(id: string): Promise<CustomerCategory | null> {
    return await this.customerCategoryRepository.findOneBy({ id });
  }

  public async create(
    categoryData: Partial<CustomerCategory>
  ): Promise<CustomerCategory> {
    const category = this.customerCategoryRepository.create(categoryData);
    return await this.customerCategoryRepository.save(category);
  }

  public async update(
    id: string,
    categoryData: Partial<CustomerCategory>
  ): Promise<CustomerCategory | null> {
    await this.customerCategoryRepository.update(id, categoryData);
    return this.getById(id);
  }

  public async delete(id: string): Promise<boolean> {
    const result = await this.customerCategoryRepository.delete(id);
    return result.affected !== 0;
  }
}
