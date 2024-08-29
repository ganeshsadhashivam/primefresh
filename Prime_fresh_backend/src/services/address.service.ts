import { inject, injectable } from "inversify";
import { AddressRepository } from "../repositories/address.repository";
import { TYPES } from "../types";
import { DataSource } from "typeorm";
import { Address } from "../entities/address.entity";
import AppError from "../utils/appError";

@injectable()
export class AddressService {
  private addressRepository: AddressRepository;

  constructor(@inject(TYPES.DataSource) private dataSource: DataSource) 
  {
    this.addressRepository = this.dataSource.getRepository(Address);
  }

  // Create a new address
  public async create(addressData: Partial<Address>): Promise<Address> 
  {
    const address = this.addressRepository.create(addressData);
    return await this.addressRepository.save(address);
  }

  // // Update an existing address
  // public async update(id: string, addressData: Partial<Address>): Promise<Address | null> 
  // {
  //   console.log(" data address is ",addressData);
  //   const address = await this.addressRepository.findOneBy({ id });
  //   console.log(" address is ",address);
  //   if (!address)
  //   {
  //     throw new AppError(404, "Address not found");
  //   }

  //   // Merge the existing address with the new data
  //   Object.assign(address, addressData);

  //   return await this.addressRepository.save(address);
  // }
  public async update(id: string, addressData: Partial<Address>): Promise<Address> {
    console.log("Data address is:", addressData);
  
    // Try to find the existing address by ID
    let address = await this.addressRepository.findOneBy({ id });
    console.log("Address is:", address);
  
    if (!address) {
      // If address not found, create a new one
      address = this.addressRepository.create(addressData);
    } else {
      // If address found, merge the existing address with the new data
      Object.assign(address, addressData);
    }
  
    // Save the address (whether it's updated or newly created)
    return await this.addressRepository.save(address);
  }
  

  // Delete an address by ID
  public async delete(id: string): Promise<boolean> 
  {
    const result = await this.addressRepository.delete(id);
    return result.affected !== 0;
  }

  // Retrieve an address by ID
  public async findById(id: string): Promise<Address | null> 
  {
    return await this.addressRepository.findOneBy({ id });
  }
}
