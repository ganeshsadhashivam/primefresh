import { Entity, Column, OneToMany } from "typeorm";

import Model from "./model.entity";
import { VendorSubcategory } from "./vendorSubcategory.entity";
import { Vendor } from "./vendor.entity";

@Entity("vendor_category")
export class VendorCategory extends Model {
  @Column()
  name: string;
  @OneToMany(() => Vendor, (vendor) => vendor.category)
  vendors: Vendor[]; // Establish one-to-many relationship with Vendor entity
  @OneToMany(
    () => VendorSubcategory,
    (vendorSubcategory) => vendorSubcategory.category
  )
  vendorSubcategories: VendorSubcategory[];
}
