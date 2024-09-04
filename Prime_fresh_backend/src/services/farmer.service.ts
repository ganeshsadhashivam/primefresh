import { inject, injectable } from "inversify";
import { Farmer } from "../entities/farmer.entity";
import { FarmerRepository } from "../repositories/farmer.repository";
import { TYPES } from "../types";
import { DataSource } from "typeorm";

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

  public async updateFarmer(
    id: string,
    farmerData: Partial<Farmer>
  ): Promise<Farmer | null> {
    const farmer = await this.farmerRepository.findOne({ where: { id } });
    if (farmer) {
      Object.assign(farmer, farmerData);
      return this.farmerRepository.save(farmer);
    }
    return null;
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
