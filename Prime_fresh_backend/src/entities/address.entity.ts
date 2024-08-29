import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import { User } from "./user.entity";
import Model from "./model.entity";
import { Vendor } from "./vendor.entity";

import { Customer } from "./customer.entity";
import { Farmer } from "./farmer.entity";
import { Locations } from "./location.entity";


@Entity("address")
export class Address extends Model {
  @Column({nullable:true})
  street: string;

  @Column({nullable:true})
  city: string;

  @Column({nullable:true})
  state: string;

  @Column({nullable:true})
  postalCode: string;

  @Column({nullable:true})
  country: string;
  @OneToOne(() => User, (user) => user.address, { onDelete: "CASCADE" })
  user: User;

  @OneToOne(() => Vendor, (vendor) => vendor.address, {
    onDelete: "CASCADE",
  })
  vendor: Vendor; // Establish many-to-one relationship with Vendor entity
  @OneToOne(() => Customer, (customer) => customer.address, {
    onDelete: "CASCADE",
  })
  customer: Customer; // Establish many-to-one relationship with Customer entity

  @OneToMany(() => Locations, (location) => location.address, { cascade: true })
  locations: Locations[]; 
  @OneToOne(() => Farmer, (farmer) => farmer.address, { onDelete: "CASCADE" })
  farmer: Farmer; // Establish one-to-one relationship with Farmer entity

}
