import { inject, injectable } from "inversify";
import { Farmer } from "../entities/farmer.entity";
import { FarmerRepository } from "../repositories/farmer.repository";
import { TYPES } from "../types";
import { DataSource } from "typeorm";
import { Crop } from "../entities/crop.entity";

@injectable()
export class FarmerService {
  private farmerRepository: FarmerRepository;

  constructor(@inject(TYPES.DataSource) private dataSource: DataSource) {
    this.farmerRepository = this.dataSource.getRepository(
      Farmer
    ) as FarmerRepository;
  }

  public async getAllFarmers(): Promise<Farmer[]> {
    return this.farmerRepository.find({ relations: ["crops"] });
  }

  public async getFarmerById(id: string): Promise<Farmer | null> {
    return this.farmerRepository.findOne({
      where: { id },
      relations: ["crops"], // Corrected to use an array
    });
  }

  public async createFarmer(farmerData: Partial<Farmer>): Promise<Farmer> {
    const farmer = this.farmerRepository.create(farmerData);
    return this.farmerRepository.save(farmer);
  }

  // public async updateFarmer(
  //   farmerId: string,
  //   updateData: any
  // ): Promise<Farmer | null> {
  //   const farmer = await this.farmerRepository.findOne({
  //     where: { id: farmerId },
  //     relations: ["crops"],
  //   });
  //   if (!farmer) {
  //     return null;
  //   }

  //   const { crops: updatedCrops, ...outerFields } = updateData;
  //   Object.assign(farmer, outerFields);

  //   if (updatedCrops) {
  //     updatedCrops.forEach((updatedCrop: any) => {
  //       const existingCrop = farmer.crops.find(
  //         (crop) => crop.id === updatedCrop.id
  //       );
  //       if (existingCrop) {
  //         for (const key in updatedCrop) {
  //           if (updatedCrop.hasOwnProperty(key)) {
  //             (existingCrop as any)[key] = updatedCrop[key];
  //           }
  //         }
  //       }
  //     });
  //   }

  //   await this.farmerRepository.save(farmer);
  //   return farmer;
  // }
  public async updateFarmer(
    farmerId: string,
    updateData: any
  ): Promise<Farmer | null> {
    const farmer = await this.farmerRepository.findOne({
      where: { id: farmerId },
      relations: ["crops"],
    });
    if (!farmer) {
      return null;
    }

    const { crops: updatedCrops, ...outerFields } = updateData;
    Object.assign(farmer, outerFields);

    if (updatedCrops) {
      updatedCrops.forEach((updatedCrop: Partial<Crop>) => {
        const existingCrop = farmer.crops.find(
          (crop) => crop.id === updatedCrop.id
        );
        if (existingCrop) {
          for (const key in updatedCrop) {
            if (updatedCrop.hasOwnProperty(key)) {
              (existingCrop as any)[key] = updatedCrop[key as keyof Crop]!;
            }
          }
        }
      });
    }

    await this.farmerRepository.save(farmer);
    return farmer;
  }

  public async deleteFarmer(id: string): Promise<boolean> {
    const farmer = await this.farmerRepository.findOne({ where: { id } });
    if (farmer) {
      await this.farmerRepository.remove(farmer);
      return true;
    }
    return false;
  }
}
