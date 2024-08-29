import {
  Entity,
 
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";

import { Address } from "./address.entity";
import Model from "./model.entity";
export enum LocationType {
  COLLECTION_CENTER = "COLLECTION_CENTER",
  DISTRIBUTION_CENTER = "DISTRIBUTION_CENTER",
  REGISTERED_OFFICE = "REGISTERED_OFFICE",
  OFFICE = "OFFICE",
}

@Entity("location")
export class Locations extends Model {
  @Column()
  name: string;

  @ManyToOne(() => Address, (address) => address.locations, { nullable: false })
  address: Address;
  
  @Column({ nullable: true })
  contactNumber?: string;

  @Column({ type: "text", nullable: true })
  notes?: string;

  @Column()
  capacity: number; // Maximum capacity in terms of storage units or volume

  //@Column({ default: true })
  //isActive: boolean; // Indicates if the warehouse is currently active or not
  @Column({
    type: "enum",
    enum: LocationType,
    default: LocationType.OFFICE, // Set a default type if needed
  })
  type: LocationType; // Location type (e.g., Collection Center, Distribution Center)
}
  

