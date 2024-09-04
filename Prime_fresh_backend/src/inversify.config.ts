import { Container } from "inversify";
import { UserController } from "./controllers/user.controller";
import { UserService } from "./services/user.service";
import { UserRepository } from "./repositories/user.repository";
import { TYPES } from "./types";
import { AuthController } from "./controllers/auth.controller";

import { DataSource } from "typeorm";
import { AppDataSource } from "./utils/data-source";

import { VendorService } from "./services/vendor.service";
import { VendorRepository } from "./repositories/vendor.repository";
import { VendorController } from "./controllers/vendor.controller";
import { VendorSubcategoryService } from "./services/vendorSubcategory.service";
import { VendorSubcategoryRepository } from "./repositories/vendorSubcategory.repository";
import { VendorSubcategoryController } from "./controllers/vendorSubcategory.controller";

import { VendorCategoryRepository } from "./repositories/vendorCategory.repository";
import { VendorCategoryController } from "./controllers/vendorCategory.controller";
import { CustomerService } from "./services/customer.service";

import { CustomerRepository } from "./repositories/customer.repository";
import { CustomerController } from "./controllers/customer.controller";
import { CustomerTypeService } from "./services/customerType.service";
import { CustomerTypeRepository } from "./repositories/customerType.repository";
import { CustomerTypeController } from "./controllers/customerType.controller";
import { CustomerCategoryRepository } from "./repositories/customerCategory.repository";
import { CustomerCategoryController } from "./controllers/customerCategory.controller";
import { CustomerCategoryService } from "./services/customerCategory.service";
import { FarmerService } from "./services/farmer.service";
import { FarmerRepository } from "./repositories/farmer.repository";
import { FarmerController } from "./controllers/farmer.controller";
import { UOMRepository } from "./repositories/uom.repository";
import { UOMConversionMatrixRepository } from "./repositories/uomMatrix.repository";
import { UOMConversionMatrixController } from "./controllers/UOMconversionMatrix.controller";
import { UOMConversionMatrixService } from "./services/UOMconversionMatrix.service";
import { UOMService } from "./services/UOM.service";
import { UOMController } from "./controllers/UOM.controller";
import { ProductCategoryService } from "./services/product_category.service";
import { ProductCategoryRepository } from "./repositories/product_category.repository";
import { ProductCategoryController } from "./controllers/productCategory.controller";
import { ProductSubcategoryService } from "./services/product_subcategory.service";
import { ProductSubcategoryRepository } from "./repositories/product_subcategory.repository";
import { ProductSubcategoryController } from "./controllers/productSubcategory.controller";
import { ProductController } from "./controllers/product.controller";

import { ProductService } from "./services/product.service";

import { AddressRepository } from "./repositories/address.repository";
import { AddressService } from "./services/address.service";
import { VendorCategoryService } from "./services/vendorCategory.service";
import { RoleService } from "./services/role.service";
import { RoleRepository } from "./repositories/role.repository";
import { RoleController } from "./controllers/role.controller";

import { DriverController } from "./controllers/drivers.controller";
import { DriverRepository } from "./repositories/driver.repository";
import { DriversService } from "./services/driver.service";
import { ProductClassificationService } from "./services/product_classification.service";
import { ProductClassificationController } from "./controllers/productClassification.controller";
import { ProductRepository } from "./repositories/product.repository";
import { LocationsService } from "./services/locations.service";
import { LocationsRepository } from "./repositories/locations.repository";
import { LocationsController } from "./controllers/locations.controller";
import { SupplierService } from "./services/supplier.service";
import { SupplierRepository } from "./repositories/supplier.repository";
import { SupplierController } from "./controllers/supplier.controller";
import { CropService } from "./services/crop.service";
import { CropRepository } from "./repositories/crop.repository";
import { CropController } from "./controllers/crop.controller";
// import { SupplierService } from "./services/supplier.service";
// import { SupplierRepository } from "./repositories/supplier.repository";
// import { SupplierController } from "./controllers/supplier.controller";

const container = new Container();

//---------------------user and Auth --------------------------------------//
container
  .bind<UserController>(TYPES.UserController)
  .to(UserController)
  .inSingletonScope();
container
  .bind<UserService>(TYPES.UserService)
  .to(UserService)
  .inSingletonScope();
container
  .bind<UserRepository>(TYPES.UserRepository)
  .to(UserRepository)
  .inSingletonScope();
container
  .bind<AuthController>(TYPES.AuthController)
  .to(AuthController)
  .inSingletonScope();

//-------------------------------------------vendor-Category-----------------------------//
// Bind your services and repositories
// Bind DataSource (make sure to initialize it somewhere in your code)
container.bind<DataSource>(TYPES.DataSource).toConstantValue(AppDataSource);
//address
container
  .bind<AddressRepository>(TYPES.AddressRepository)
  .to(AddressRepository)
  .inSingletonScope();

container
  .bind<AddressService>(TYPES.AddressService)
  .to(AddressService)
  .inSingletonScope();

//vendor category

container
  .bind<VendorCategoryRepository>(TYPES.VendorCategoryRepository)
  .to(VendorCategoryRepository)
  .inSingletonScope();
container
  .bind<VendorCategoryController>(TYPES.VendorCategoryController)
  .to(VendorCategoryController)
  .inSingletonScope();
container
  .bind<VendorCategoryService>(TYPES.VendorCategoryService)
  .to(VendorCategoryService)
  .inSingletonScope();

//---------------vendorSubcategory-------------------------------
container
  .bind<VendorSubcategoryService>(TYPES.VendorSubcategoryService)
  .to(VendorSubcategoryService)
  .inSingletonScope();
container
  .bind<VendorSubcategoryRepository>(TYPES.VendorSubcategoryRepository)
  .to(VendorSubcategoryRepository)
  .inSingletonScope();
container
  .bind<VendorSubcategoryController>(TYPES.VendorSubcategoryController)
  .to(VendorSubcategoryController)
  .inSingletonScope();

//------------------Vendor------------------------------------------
container
  .bind<VendorService>(TYPES.VendorService)
  .to(VendorService)
  .inSingletonScope();
container
  .bind<VendorRepository>(TYPES.VendorRepository)
  .to(VendorRepository)
  .inSingletonScope();
container
  .bind<VendorController>(TYPES.VendorController)
  .to(VendorController)
  .inSingletonScope();

//---------------------------Customer------------------------
container
  .bind<CustomerService>(TYPES.CustomerService)
  .to(CustomerService)
  .inSingletonScope();
container
  .bind<CustomerRepository>(TYPES.CustomerRepository)
  .to(CustomerRepository)
  .inSingletonScope();
container
  .bind<CustomerController>(TYPES.CustomerController)
  .to(CustomerController)
  .inSingletonScope();

//---------------------------CustomerType------------------------
container
  .bind<CustomerTypeService>(TYPES.CustomerTypeService)
  .to(CustomerTypeService)
  .inSingletonScope();
container
  .bind<CustomerTypeRepository>(TYPES.CustomerTypeRepository)
  .to(CustomerTypeRepository)
  .inSingletonScope();
container
  .bind<CustomerTypeController>(TYPES.CustomerTypeController)
  .to(CustomerTypeController)
  .inSingletonScope();

//-----------------CustomerCategory-----------------

container
  .bind<CustomerCategoryService>(TYPES.CustomerCategoryService)
  .to(CustomerCategoryService)
  .inSingletonScope();
container
  .bind<CustomerCategoryRepository>(TYPES.CustomerCategoryRepository)
  .to(CustomerCategoryRepository)
  .inSingletonScope();
container
  .bind<CustomerCategoryController>(TYPES.CustomerCategoryController)
  .to(CustomerCategoryController)
  .inSingletonScope();

//----------------------Farmer-----------------------------

container
  .bind<FarmerService>(TYPES.FarmerService)
  .to(FarmerService)
  .inSingletonScope();
container
  .bind<FarmerRepository>(TYPES.FarmerRepository)
  .to(FarmerRepository)
  .inSingletonScope();
container
  .bind<FarmerController>(TYPES.FarmerController)
  .to(FarmerController)
  .inSingletonScope();

//----------------------Crop-----------------------------

container
  .bind<CropService>(TYPES.CropService)
  .to(CropService)
  .inSingletonScope();
container
  .bind<CropRepository>(TYPES.CropRepository)
  .to(CropRepository)
  .inSingletonScope();
container
  .bind<CropController>(TYPES.CropController)
  .to(CropController)
  .inSingletonScope();

//------------------------UOMconversionMatrix-----------------------------
container
  .bind<UOMConversionMatrixService>(TYPES.UOMConversionMatrixService)
  .to(UOMConversionMatrixService)
  .inSingletonScope();
container
  .bind<UOMConversionMatrixRepository>(TYPES.UOMConversionMatrixRepository)
  .to(UOMConversionMatrixRepository)
  .inSingletonScope();
container
  .bind<UOMConversionMatrixController>(TYPES.UOMConversionMatrixController)
  .to(UOMConversionMatrixController)
  .inSingletonScope();

//------------------------UOM-----------------------------------
container.bind<UOMRepository>(TYPES.UOMRepository).to(UOMRepository);
container.bind<UOMService>(TYPES.UOMService).to(UOMService);
container.bind<UOMController>(TYPES.UOMController).to(UOMController);

//----------------------Product_Category-------------------------
container
  .bind<ProductCategoryService>(TYPES.ProductCategoryService)
  .to(ProductCategoryService)
  .inSingletonScope();
container
  .bind<ProductCategoryRepository>(TYPES.ProductCategoryRepository)
  .to(ProductCategoryRepository)
  .inSingletonScope();
container
  .bind<ProductCategoryController>(TYPES.ProductCategoryController)
  .to(ProductCategoryController)
  .inSingletonScope();

//----------------------------Product_Subcategory------------
container
  .bind<ProductSubcategoryService>(TYPES.ProductSubcategoryService)
  .to(ProductSubcategoryService)
  .inSingletonScope();
container
  .bind<ProductSubcategoryRepository>(TYPES.ProductSubcategoryRepository)
  .to(ProductSubcategoryRepository)
  .inSingletonScope();
container
  .bind<ProductSubcategoryController>(TYPES.ProductSubcategoryController)
  .to(ProductSubcategoryController);

//----------------------------Product---------------------------------------

container.bind<ProductService>(TYPES.ProductService).to(ProductService);

container
  .bind<ProductRepository>(TYPES.ProductRepository)
  .to(ProductRepository);

container
  .bind<ProductController>(TYPES.ProductController)
  .to(ProductController);

//--------------------------role------------------------------

container.bind<RoleService>(TYPES.RoleService).to(RoleService);
container
  .bind<RoleRepository>(TYPES.RoleRepository)
  .to(RoleRepository)
  .inSingletonScope();
container
  .bind<RoleController>(TYPES.RoleController)
  .to(RoleController)
  .inSingletonScope();

//-------------------------driver------------------------------
container.bind<DriversService>(TYPES.DriversService).to(DriversService);
container
  .bind<DriverRepository>(TYPES.DriverRepository)
  .to(DriverRepository)
  .inSingletonScope();
container
  .bind<DriverController>(TYPES.DriverController)
  .to(DriverController)
  .inSingletonScope();
//-------------------------------productclassfication------------------------------
container
  .bind<ProductClassificationService>(TYPES.ProductClassificationService)
  .to(ProductClassificationService);
container
  .bind<ProductClassificationController>(TYPES.ProductClassificationController)
  .to(ProductClassificationController);
container
  .bind<ProductCategoryRepository>(TYPES.ProductClassificationRepository)
  .to(ProductCategoryRepository);
//------------------Locations------------------------------------------
container
  .bind<LocationsService>(TYPES.LocationsService)
  .to(LocationsService)
  .inSingletonScope();
container
  .bind<LocationsRepository>(TYPES.LocationsRepository)
  .to(LocationsRepository)
  .inSingletonScope();
container
  .bind<LocationsController>(TYPES.LocationsController)
  .to(LocationsController)
  .inSingletonScope();

//------------------Supplier------------------------------------------

container.bind<SupplierService>(TYPES.SupplierService).to(SupplierService);
container
  .bind<SupplierRepository>(TYPES.SupplierRepository)
  .to(SupplierRepository);
container
  .bind<SupplierController>(TYPES.SupplierController)
  .to(SupplierController);

export { container };
