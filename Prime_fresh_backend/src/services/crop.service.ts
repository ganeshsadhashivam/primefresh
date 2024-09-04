import { inject, injectable } from "inversify";
import { Crop } from "../entities/crop.entity";
import { CropRepository } from "../repositories/crop.repository";
import { TYPES } from "../types";
import { DataSource } from "typeorm";

@injectable()
export class CropService {
  private cropRepository: CropRepository;

  constructor(@inject(TYPES.DataSource) private dataSource: DataSource) {
    this.cropRepository = this.dataSource.getRepository(Crop) as CropRepository;
  }

  public async getAllCrops(): Promise<Crop[]> {
    return this.cropRepository.find({ relations: ["farmer"] });
  }

  public async getCropById(id: string): Promise<Crop | null> {
    return this.cropRepository.findOne({
      where: { id },
      relations: ["farmer"],
    });
  }

  public async createCrop(cropData: Partial<Crop>): Promise<Crop> {
    const crop = this.cropRepository.create(cropData);
    return this.cropRepository.save(crop);
  }

  public async updateCrop(
    id: string,
    cropData: Partial<Crop>
  ): Promise<Crop | null> {
    const crop = await this.cropRepository.findOne({ where: { id } });
    if (crop) {
      Object.assign(crop, cropData);
      return this.cropRepository.save(crop);
    }
    return null;
  }

  public async deleteCrop(id: string): Promise<boolean> {
    const crop = await this.cropRepository.findOne({ where: { id } });
    if (crop) {
      await this.cropRepository.remove(crop);
      return true;
    }
    return false;
  }
}
