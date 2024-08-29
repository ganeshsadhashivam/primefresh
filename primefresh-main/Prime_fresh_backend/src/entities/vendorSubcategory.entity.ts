import { Entity, Column, ManyToOne, OneToMany } from "typeorm";

import Model from "./model.entity";
import { VendorCategory } from "./vendorCategory.entity";
import { Vendor } from "./vendor.entity";

@Entity("vendor_subcategory")
export class VendorSubcategory extends Model {
  @Column()
  name: string;

  @ManyToOne(
    () => VendorCategory,
    (vendorCategory) => vendorCategory.vendorSubcategories
  )
  category: VendorCategory;

  @OneToMany(() => Vendor, (vendor) => vendor.subcategory)
  vendors: Vendor[];
}
