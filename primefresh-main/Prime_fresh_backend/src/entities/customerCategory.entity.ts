import { Entity, Column, OneToMany } from "typeorm";

import Model from "./model.entity";
import { Customer } from "./customer.entity";

@Entity("customer_category")
export class CustomerCategory extends Model {
  @Column()
  name: string;
  @OneToMany(() => Customer, (customer) => customer.customerCategory)
  customers: Customer[];
}
