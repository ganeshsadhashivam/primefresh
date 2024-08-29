import { injectable, inject } from "inversify";
import { DataSource } from "typeorm";
import { TYPES } from "../types";
import { UOMConversionMatrixRepository } from "../repositories/uomMatrix.repository";
import { UOMConversionMatrix } from "../entities/uom_matrix.entity";

@injectable()
export class UOMConversionMatrixService {
  private uomConversionMatrixRepository: UOMConversionMatrixRepository;

  constructor(@inject(TYPES.DataSource) private dataSource: DataSource) {
    this.uomConversionMatrixRepository = this.dataSource.getRepository(
      UOMConversionMatrix
    ) as UOMConversionMatrixRepository;
  }

  public async getAll(): Promise<UOMConversionMatrix[]> {
    return this.uomConversionMatrixRepository.find({
      relations: ["fromUOM", "toUOM"],
    });
  }

  public async getById(id: string): Promise<UOMConversionMatrix | null> {
    return this.uomConversionMatrixRepository.findOne({
      where: { id },
      relations: ["fromUOM", "toUOM"],
    });
  }

  public async create(
    conversionData: Partial<UOMConversionMatrix>
  ): Promise<UOMConversionMatrix> {
    const conversion =
      this.uomConversionMatrixRepository.create(conversionData);
    return this.uomConversionMatrixRepository.save(conversion);
  }

  public async update(
    id: string,
    conversionData: Partial<UOMConversionMatrix>
  ): Promise<UOMConversionMatrix | null> {
    await this.uomConversionMatrixRepository.update(id, conversionData);
    return this.getById(id);
  }

  public async delete(id: string): Promise<boolean> {
    const result = await this.uomConversionMatrixRepository.delete(id);
    return result.affected !== 0;
  }
}
