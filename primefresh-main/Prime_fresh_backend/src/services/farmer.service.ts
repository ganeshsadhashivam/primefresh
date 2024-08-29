import { injectable, inject } from "inversify";
import { FarmerRepository } from "../repositories/farmer.repository";
import { DataSource } from "typeorm";
import { Farmer } from "../entities/farmer.entity";
import { TYPES } from "../types";
import { AddressService } from "./address.service";
import { UpdateFarmerInput } from "../schemas/farmer.schema";
import AppError from "../utils/appError";

@injectable()
export class FarmerService {
  private farmerRepository: FarmerRepository;
  private addressService: AddressService;

  constructor(@inject(TYPES.DataSource) private dataSource: DataSource,
  @inject(TYPES.AddressService) addressService: AddressService)
   {
    this.farmerRepository = this.dataSource.getRepository(
      Farmer
    ) as FarmerRepository;
    this.addressService = addressService;
  }

  public async getAll(): Promise<Farmer[]> {
    return this.farmerRepository.find({relations: [ 'address']});
  }

  public async getById(id: string): Promise<Farmer | null> {
    return this.farmerRepository.findOne({
      where: { id },
      relations: ['address'], // Load the related Address entity
  });;
  }

  public async create(farmerData: Partial<Farmer>): Promise<Farmer> {
    const farmer = this.farmerRepository.create(farmerData);
    return this.farmerRepository.save(farmer);
  }

  public async updateFarmer(id: string, farmersData:UpdateFarmerInput): Promise<Farmer| null> {
    const { street, city, state, postalCode, country, ...rest } = farmersData;
  
    const farmers = await this.farmerRepository.findOne({
      where: { id },
      relations: ['address']
    });
    if (!farmers) {
      throw new AppError(404, "Driver not found");
    }
  // Handle address update or creation
  if (street || city || state || postalCode || country) {
    let address = farmers.address;
  
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
  
    farmers.address = address;
  }
  
    
    
  
  
  Object.assign(farmers, rest);
  
  return await this.farmerRepository.save(farmers);
  }
  
  

  public async delete(id: string): Promise<boolean> {
    const result = await this.farmerRepository.delete(id);
    return result.affected !== 0;
  }
}
