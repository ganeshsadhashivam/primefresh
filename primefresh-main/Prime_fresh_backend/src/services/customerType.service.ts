import { inject, injectable } from "inversify";

import { DataSource } from "typeorm";

import { TYPES } from "../types";
import { CustomerType } from "../entities/customerType.entity";
import { CustomerTypeRepository } from "../repositories/customerType.repository";

@injectable()
export class CustomerTypeService {
  private customerTypeRepository: CustomerTypeRepository;

  constructor(@inject(TYPES.DataSource) private dataSource: DataSource) {
    this.customerTypeRepository = this.dataSource.getRepository(
      CustomerType
    ) as CustomerTypeRepository;
  }
  async getAllCustomerTypes(): Promise<CustomerType[]> {
    return this.customerTypeRepository.find();
  }

  async getCustomerTypeById(id: string): Promise<CustomerType | null> {
    return this.customerTypeRepository.findOneBy({ id });
  }

  async createCustomerType(name: string): Promise<CustomerType> {
    const customerType = this.customerTypeRepository.create({ name });
    return this.customerTypeRepository.save(customerType);
  }

  async updateCustomerType(
    id: string,
    name: string
  ): Promise<CustomerType | null> {
    const customerType = await this.customerTypeRepository.findOneBy({ id });
    if (!customerType) {
      return null;
    }
    customerType.name = name;
    return this.customerTypeRepository.save(customerType);
  }

  async deleteCustomerType(id: string): Promise<boolean> {
    const result = await this.customerTypeRepository.delete(id);
    return result.affected !== 0;
  }
}
