import { inject, injectable } from "inversify";
import { DataSource } from "typeorm";
import { CustomerRepository } from "../repositories/customer.repository";
import { Customer } from "../entities/customer.entity";
import { CustomerCategoryService } from "./customerCategory.service";
import { CustomerTypeService } from "./customerType.service";
import { AddressService } from "./address.service";
import AppError from "../utils/appError";
import { TYPES } from "../types";
import { CreateCustomerInput, UpdateCustomerInput } from "../schemas/customer.schema";
import { Address } from "../entities/address.entity";

@injectable()
export class CustomerService {
  private customerRepository: CustomerRepository;
  private customerCategoryService: CustomerCategoryService;
  private customerTypeService: CustomerTypeService;
  private addressService: AddressService;

  constructor(
    @inject(TYPES.DataSource) private dataSource: DataSource,
    @inject(TYPES.CustomerCategoryService) customerCategoryService: CustomerCategoryService,
    @inject(TYPES.CustomerTypeService) customerTypeService: CustomerTypeService,
    @inject(TYPES.AddressService) addressService: AddressService
  ) {
    this.customerRepository = this.dataSource.getRepository(Customer) as CustomerRepository;
    this.customerCategoryService = customerCategoryService;
    this.customerTypeService = customerTypeService;
    this.addressService = addressService;
  }

  public async create(customerData: CreateCustomerInput): Promise<Customer> {
    const { customerCategory: customerCategoryId, customerType: customerTypeId, address, ...rest } = customerData;
  
    if (!customerCategoryId || !customerTypeId) {
      throw new AppError(400, "Customer category ID and customer type ID are required");
    }
  
    const [customerCategory, customerType] = await Promise.all([
      this.customerCategoryService.getById(customerCategoryId),
      this.customerTypeService.getCustomerTypeById(customerTypeId)
    ]);
  
    if (!customerCategory || !customerType) {
      throw new AppError(400, "Invalid customer category or customer type");
    }
  
    const customerAddress = address ? await this.addressService.create(address) : undefined;
  
    const customer = this.customerRepository.create({
      ...rest,
      customerCategory,
      customerType,
      address: customerAddress,
    });
  
    return await this.customerRepository.save(customer);
  }
  
  

  public async update(id: string, customerData:UpdateCustomerInput): Promise<Customer | null> {
    const { customerCategoryId, customerTypeId, street, city, state, postalCode, country, ...rest } = customerData;

    const customer = await this.customerRepository.findOne({
      where: { id },
      relations: ['address']
    });
    if (!customer) {
      throw new AppError(404, "Customer not found");
    }

    if (customerCategoryId) {
      const customerCategory = await this.customerCategoryService.getById(customerCategoryId);
      if (!customerCategory) {
        throw new AppError(400, "Invalid customer category");
      }
      customer.customerCategory = customerCategory;
    }

    if (customerTypeId) {
      const customerType = await this.customerTypeService.getCustomerTypeById(customerTypeId);
      if (!customerType) {
        throw new AppError(400, "Invalid customer type");
      }
      customer.customerType = customerType;
    }

     // Handle address update or creation
     if (street || city || state || postalCode || country) {
      let address = customer.address;
  
      if (!address) {
        // Create a new address if it does not exist
        address = await this.addressService.create({
          street,
          city,
          state,
          postalCode,
          country,
        });
      } else {
        // Update existing address with the provided fields
        const updatedAddressData = {
          street: street ?? address.street,
          city: city ?? address.city,
          state: state ?? address.state,
          postalCode: postalCode ?? address.postalCode,
          country: country ?? address.country,
        };
  
        address = await this.addressService.update(address.id, updatedAddressData);
        if (!address) {
          throw new AppError(400, "Address update failed");
        }
      }
  
      customer.address = address;
    }
  
      
      
  

    Object.assign(customer, rest);

    return await this.customerRepository.save(customer);
  }

  public  async delete(id: string): Promise<boolean> {
    const result = await this.customerRepository.delete(id);
    return result.affected !== 0;
  }

  public async getById(id: string): Promise<Customer | null> {
    return await this.customerRepository.findOne({
      where: { id },
      relations: ['customerCategory', 'customerType', 'address']
    });
  }

  public async getAll(): Promise<Customer[]> {
    return await this.customerRepository.find({
      relations: ['customerCategory', 'customerType', 'address']
    });
  }
}
