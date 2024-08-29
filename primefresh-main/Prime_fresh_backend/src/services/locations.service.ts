import { inject, injectable } from "inversify";
import { LocationsRepository } from "../repositories/locations.repository";
import { DataSource } from "typeorm";
import { TYPES } from "../types";
import { Locations, LocationType } from "../entities/location.entity";
import { AddressRepository } from "../repositories/address.repository";
import { Address } from "../entities/address.entity";

@injectable()
export class LocationsService {
private locationsRepository: LocationsRepository;
private addressRepository: AddressRepository;
constructor(@inject(TYPES.DataSource) private dataSource: DataSource) {
  this.locationsRepository = this.dataSource.getRepository(
    Locations
  ) as LocationsRepository;
  this.addressRepository = this.dataSource.getRepository(Address) as AddressRepository;
}
async getAllLocations(): Promise<Locations[]> {
    return this.locationsRepository.find({ relations: ["address"] });
  }

  async getLocationById(id: string): Promise<Locations | null> {
    return this.locationsRepository.findOne( { where: { id }, relations: ["address"] });
  }
  async getLocationsByType(type: LocationType): Promise<Locations[]> {
    return this.locationsRepository.find({
      where: { type },
      relations: ["address"],
    });
  }
  
  async createLocation(data:any): Promise<Locations[]> {
    const { address, ...locationData } = data;
    const newAddress = this.addressRepository.create(address);
    const savedAddress = await this.addressRepository.save(newAddress);

    const newLocation = this.locationsRepository.create({
      ...locationData,
      address: savedAddress,
    });

    return this.locationsRepository.save(newLocation);
  }

  async updateLocation(id: string, locationData: Partial<Locations>): Promise<Locations | null> {
    const location = await this.getLocationById(id);
    if (!location) return null;

    Object.assign(location, locationData);
    return this.locationsRepository.save(location);
  }

  async deleteLocation(id: number): Promise<boolean> {
    const result = await this.locationsRepository.delete(id);
    return result.affected !== 0;
  }
}


