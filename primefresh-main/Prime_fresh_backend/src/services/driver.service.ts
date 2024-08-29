import { injectable, inject } from 'inversify';
import { DriverRepository } from '../repositories/driver.repository';
import {  Drivers } from '../entities/driver.entity';
import { DataSource } from 'typeorm';
import { TYPES } from '../types';
import { UpdateDriverInput } from '../schemas/drivers.schema';
import AppError from '../utils/appError';
import { AddressService } from './address.service';

@injectable()
export class DriversService {
    private driverRepository: DriverRepository
    private addressService: AddressService;
  
  constructor(@inject(TYPES.DataSource) private dataSource: DataSource,
  @inject(TYPES.AddressService) addressService: AddressService) {
    this.driverRepository = this.dataSource.getRepository(
      Drivers
    ) as DriverRepository;
    this.addressService = addressService;
  }
  // async createDriver(driverData: Partial<Drivers>): Promise<Drivers> {
  //   const driver = this.driverRepository.create(driverData);
  //   return await this.driverRepository.save(driver);
  // }

  async createDriver(driverData: Partial<Drivers>): Promise<Drivers> {
    console.log('Driver data received:', driverData);
    const driver = this.driverRepository.create(driverData);

    // Check if address is provided in driverData
    if (driverData.address) {
        // Ensure the address is properly created or updated
        driver.address = driverData.address;
    }

    return await this.driverRepository.save(driver);
}


  // async findDriverById(id: string): Promise<Drivers | null> {
  //   return await this.driverRepository.findOneBy({ id });
  // }
  async findDriverById(id: string): Promise<Drivers | null> {
    return await this.driverRepository.findOne({
        where: { id },
        relations: ['address'], // Load the related Address entity
    });
}


public async updateDriver(id: string, driversData:UpdateDriverInput): Promise<Drivers | null> {
  const { street, city, state, postalCode, country, ...rest } = driversData;

  const drivers = await this.driverRepository.findOne({
    where: { id },
    relations: ['address']
  });
  if (!drivers) {
    throw new AppError(404, "Driver not found");
  }
// Handle address update or creation
if (street || city || state || postalCode || country) {
  let address = drivers.address;

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

  drivers.address = address;
}

  
  


Object.assign(drivers, rest);

return await this.driverRepository.save(drivers);
}


  async deleteDriver(id: string): Promise<void> {
    await this.driverRepository.delete(id);
  }

  async getAllDrivers ():Promise<Drivers[]>{
    return await this.driverRepository.find( {relations: [ 'address']})
  }
}
