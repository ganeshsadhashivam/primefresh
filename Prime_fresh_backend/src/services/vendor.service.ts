import { inject, injectable } from "inversify";
import { DataSource, DeepPartial } from "typeorm";
import { Vendor } from "../entities/vendor.entity";
import { VendorRepository } from "../repositories/vendor.repository";
import { TYPES } from "../types";
import AppError from "../utils/appError";
import { Status } from "../utils/status.enum";
import { VendorSubcategory } from "../entities/vendorSubcategory.entity";
import { VendorCategory } from "../entities/vendorCategory.entity";
import { Address } from "../entities/address.entity";
import { CreateVendorInput } from "../schemas/vendor.schema";

@injectable()
export class VendorService {
  private vendorRepository: VendorRepository;

  constructor(@inject(TYPES.DataSource) private dataSource: DataSource) {
    this.vendorRepository = this.dataSource.getRepository(Vendor) as VendorRepository;
  }

  async getVendorById(id: string): Promise<Vendor | null> {
    const vendor = await this.vendorRepository.findOneBy({ id });
    if (!vendor) {
      throw new AppError(404, "Vendor not found");
    }
    return vendor;
  }

  async getAllVendors(): Promise<Vendor[]> {
    return await this.vendorRepository.find();
  }
  


  public async createVendor(data: CreateVendorInput): Promise<Vendor> {
    const { subcategoryId, categoryId, address, ...vendorData } = data;
  
    // Fetch the VendorSubcategory and VendorCategory from the database
    const vendorSubcategory = await this.dataSource.getRepository(VendorSubcategory).findOne({
      where: { id: subcategoryId },
    });
  
    const vendorCategory = await this.dataSource.getRepository(VendorCategory).findOne({
      where: { id: categoryId },
    });
  
    // If the VendorSubcategory or VendorCategory does not exist, throw an error
    if (!vendorSubcategory) {
      throw new AppError(404, "Vendor subcategory not found");
    }
    if (!vendorCategory) {
      throw new AppError(404, "Vendor category not found");
    }
  
    // Create and save the Address entity if address data is provided
    let vendorAddress: Address | undefined;
    if (address) {
      vendorAddress = this.dataSource.getRepository(Address).create(address as DeepPartial<Address>);
      vendorAddress = await this.dataSource.getRepository(Address).save(vendorAddress);
    }
  
    // Create a new Vendor entity
    const newVendor = this.vendorRepository.create({
      ...vendorData,
      status: Status.PENDING, // Assuming default status is PENDING
      subcategory: vendorSubcategory,
      category: vendorCategory,
      address: vendorAddress,
    });
  
    // Save the new Vendor to the database
    return this.vendorRepository.save(newVendor);
  }
  

  async updateVendor(id: string, data: Partial<Vendor>): Promise<Vendor> {
    const vendor = await this.getVendorById(id);
    if (!vendor) {
      throw new AppError(404, "Vendor not found");
    }
    Object.assign(vendor, data);
  
    // Ensure the vendor is not null before saving
    return await this.vendorRepository.save(vendor);
  }
  

  async deleteVendor(id: string): Promise<void> {
    const result = await this.vendorRepository.delete(id);
    if (result.affected === 0) {
      throw new AppError(404, "Vendor not found");
    }
  }
}
