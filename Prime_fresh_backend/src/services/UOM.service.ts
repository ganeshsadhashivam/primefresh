import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { DataSource } from "typeorm";
import { UOM } from "../entities/uom.entity";
import { UOMRepository } from "../repositories/uom.repository";
@injectable()
export class UOMService {
  private UOMRepository: UOMRepository;

  constructor(@inject(TYPES.DataSource) private dataSource: DataSource) {
    this.UOMRepository = this.dataSource.getRepository(UOM) as UOMRepository;
  }
  public async getAll(): Promise<UOM[]> {
    return this.UOMRepository.find();
  }

  public async getById(id: string): Promise<UOM | null> {
    return this.UOMRepository.findOneBy({ id });
  }

  public async create(uomData: Partial<UOM>): Promise<UOM> {
    const uom = this.UOMRepository.create(uomData);
    return this.UOMRepository.save(uom);
  }

  public async update(id: string, uomData: Partial<UOM>): Promise<UOM | null> {
    await this.UOMRepository.update(id, uomData);
    return this.getById(id);
  }

  public async delete(id: string): Promise<boolean> {
    const result = await this.UOMRepository.delete(id);
    return result.affected !== 0;
  }
}
