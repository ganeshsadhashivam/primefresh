import { inject, injectable } from "inversify";
import { DataSource } from "typeorm";
import { VendorSubcategoryRepository } from "../repositories/vendorSubcategory.repository";
import { VendorSubcategory } from "../entities/vendorSubcategory.entity";
import { TYPES } from "../types";
import { VendorCategory } from "../entities/vendorCategory.entity";

@injectable()
export class VendorSubcategoryService {
  private vendorSubcategoryRepository: VendorSubcategoryRepository;

  constructor(@inject(TYPES.DataSource) private dataSource: DataSource) {
    this.vendorSubcategoryRepository = this.dataSource.getRepository(VendorSubcategory) as VendorSubcategoryRepository;
  }

  public async create(subcategoryData: Partial<VendorSubcategory>, categoryId: string): Promise<VendorSubcategory> {
    // Fetch the VendorCategory from the database using the provided categoryId
    const vendorCategory = await this.dataSource.getRepository(VendorCategory).findOne({
      where: { id: categoryId },
    });

    // If the VendorCategory does not exist, throw an error
    if (!vendorCategory) {
      throw new Error("Vendor category not found");
    }

    // Assign the fetched VendorCategory to the subcategory data
    subcategoryData.category = vendorCategory;

    // Create and save the new VendorSubcategory
    const subcategory = this.vendorSubcategoryRepository.create(subcategoryData);
    return this.vendorSubcategoryRepository.save(subcategory);
  }

  public async getSubcategories(): Promise<VendorSubcategory[]> {
    return this.vendorSubcategoryRepository.find({
      relations: ["category"], 
    });
  }

  public async getById(id: string): Promise<VendorSubcategory | null> {
    return this.vendorSubcategoryRepository.findOne({
      where: { id },
      relations: ["category"], // Ensure correct relation name
    });
  }

  public async update(
    id: string,
    subcategoryData: Partial<VendorSubcategory>
  ): Promise<VendorSubcategory | null> {
    await this.vendorSubcategoryRepository.update(id, subcategoryData);
    return this.getById(id);
  }

  public async delete(id: string): Promise<boolean> {
    const result = await this.vendorSubcategoryRepository.delete(id);
    return result.affected !== 0;
  }
}
