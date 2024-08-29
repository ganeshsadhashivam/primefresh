import { inject, injectable } from "inversify";
import { DataSource } from "typeorm";
import { VendorCategoryRepository } from "../repositories/vendorCategory.repository";
import { VendorCategory } from "../entities/vendorCategory.entity";
import { TYPES } from "../types";

@injectable()
export class VendorCategoryService {
  private vendorCategoryRepository: VendorCategoryRepository;

  constructor(@inject(TYPES.DataSource) private dataSource: DataSource) {
    this.vendorCategoryRepository = this.dataSource.getRepository(VendorCategory) as VendorCategoryRepository;
  }

  public async create(categoryData: Partial<VendorCategory>): Promise<VendorCategory> {
    const category = this.vendorCategoryRepository.create(categoryData);
    return this.vendorCategoryRepository.save(category);
  }

  public async getCategories(): Promise<VendorCategory[]> {
    return this.vendorCategoryRepository.find({
      relations: ["vendorSubcategories"], // Adjust relations if needed
    });
  }

  public async getById(id: string): Promise<VendorCategory | null> {
    return this.vendorCategoryRepository.findOne({
      where: { id },
      relations: ["vendorSubcategories"], // Adjust relations if needed
    });
  }

  public async update(
    id: string,
    categoryData: Partial<VendorCategory>
  ): Promise<VendorCategory | null> {
    await this.vendorCategoryRepository.update(id, categoryData);
    return this.getById(id);
  }

  public async delete(id: string): Promise<boolean> {
    const result = await this.vendorCategoryRepository.delete(id);
    return result.affected !== 0;
  }
}
