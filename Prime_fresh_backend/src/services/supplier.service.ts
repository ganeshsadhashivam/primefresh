// import { injectable, inject } from "inversify";
// import { SupplierRepository } from "../repositories/supplier.repository";
// import { Supplier } from "../entities/supplier.entity";
// import { TYPES } from "../types";
// import { DataSource } from "typeorm";
// import { SupplierSchema, SupplierDTO } from "../schemas/supplier.schema";
// import { ZodError } from "zod";

// @injectable()
// export class SupplierService {
//   private supplierRepository: SupplierRepository;

//   constructor(@inject(TYPES.DataSource) private dataSource: DataSource) {
//     this.supplierRepository = this.dataSource.getRepository(
//       Supplier
//     ) as SupplierRepository;
//   }

//   public async getAllSuppliers(): Promise<Supplier[]> {
//     return this.supplierRepository.find();
//   }

//   public async getSupplierById(id: string): Promise<Supplier | null> {
//     return this.supplierRepository.findOne({ where: { id } });
//   }

//   public async createSupplier(supplierData: SupplierDTO): Promise<Supplier> {
//     // Validate data with Zod
//     try {
//       SupplierSchema.parse(supplierData);
//     } catch (error) {
//       if (error instanceof ZodError) {
//         throw new Error(`Validation failed: ${error.errors.map(err => err.message).join(", ")}`);
//       }
//       throw error;
//     }

//     const supplier = this.supplierRepository.create(supplierData);
//     return this.supplierRepository.save(supplier);
//   }

//   public async updateSupplier(
//     id: string,
//     supplierData: SupplierDTO
//   ): Promise<Supplier | null> {
//     // Validate data with Zod
//     try {
//       SupplierSchema.parse(supplierData);
//     } catch (error) {
//       if (error instanceof ZodError) {
//         throw new Error(`Validation failed: ${error.errors.map(err => err.message).join(", ")}`);
//       }
//       throw error;
//     }

//     await this.supplierRepository.update(id, supplierData);
//     return this.getSupplierById(id);
//   }

//   public async deleteSupplier(id: number): Promise<boolean> {
//     const result = await this.supplierRepository.delete(id);
//     return result.affected !== 0;
//   }
// }

import { injectable, inject } from "inversify";
import { SupplierRepository } from "../repositories/supplier.repository";
import { Supplier } from "../entities/supplier.entity";
import { TYPES } from "../types";
import { DataSource } from "typeorm";

@injectable()
export class SupplierService {
  private supplierRepository: SupplierRepository;

  constructor(@inject(TYPES.DataSource) private dataSource: DataSource) {
    this.supplierRepository = this.dataSource.getRepository(
      Supplier
    ) as SupplierRepository;
  }

  public async getAllSuppliers(): Promise<Supplier[]> {
    return this.supplierRepository.find();
  }

  public async getSupplierById(id: string): Promise<Supplier | null> {
    return this.supplierRepository.findOne({ where: { id } });
  }

  public async createSupplier(
    supplierData: Supplier
  ): Promise<Supplier | null> {
    try {
      console.log("in the service");

      // Create a new supplier entity
      const supplier = this.supplierRepository.create(supplierData);
      console.log("after creating supplier");

      // Save the supplier to the database
      const savedSupplier = await this.supplierRepository.save(supplier);
      console.log("supplier saved successfully");

      // Return the saved supplier
      return savedSupplier;
    } catch (error) {
      console.error("Error in createSupplier service:", error);

      // You can throw a custom error or return null
      // Throwing a custom error
      throw new Error("Failed to create supplier");

      // Or simply return null if you don't want to throw an error
      // return null;
    }
  }

  public async updateSupplier(
    id: string,
    supplierData: Supplier
  ): Promise<Supplier | null> {
    await this.supplierRepository.update(id, supplierData);
    return this.getSupplierById(id);
  }

  public async deleteSupplier(id: number): Promise<boolean> {
    const result = await this.supplierRepository.delete(id);
    return result.affected !== 0;
  }
}
