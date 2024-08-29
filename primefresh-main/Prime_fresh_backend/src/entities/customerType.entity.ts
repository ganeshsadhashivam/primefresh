import { Entity, Column, OneToMany } from "typeorm";

import Model from "./model.entity";
import { Customer } from "./customer.entity";

@Entity("customer_type")
export class CustomerType extends Model {
  @Column()
  name: string;
  @OneToMany(() => Customer, (customer) => customer.customerType)
  customers: Customer[];
}
