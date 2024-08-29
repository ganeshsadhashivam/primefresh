


// src/types.ts
const TYPES = {
  //--------User-----------
  UserController: Symbol.for("UserController"),
  UserService: Symbol.for("UserService"),
  UserRepository: Symbol.for("UserRepository"),
  AuthController: Symbol.for("AuthController"),

  //-----------------------role -----------------------
  RoleService:Symbol.for("RoleService"),
  RoleRepository:Symbol.for("RoleRepository"),
  RoleController:Symbol.for("RoleController"),
  //--------VendorCategory----------
  VendorCategoryService: Symbol.for("VendorCategoryService"),
  VendorCategoryRepository: Symbol.for("VendorCategoryRepository"),
  VendorCategoryController: Symbol.for("VendorCategoryController"),

  // DataSource
  DataSource: Symbol.for("DataSource"),
  // address
  AddressRepository:Symbol.for("AddressRepository"),
  AddressService:Symbol.for("AddressService"),

  //-------VendorSubcategory--------------------------------------
  VendorSubcategoryService: Symbol.for("VendorSubcategoryService"),
  VendorSubcategoryRepository: Symbol.for("VendorSubcategoryRepository"),
  VendorSubcategoryController: Symbol.for("VendorSubcategoryController"),

  //-------------Vendor-------------------------------------------------
  VendorService: Symbol.for("VendorService"),
  VendorRepository: Symbol.for("VendorRepository"),
  VendorController: Symbol.for("VendorController"),
  //-------------customer-----------------
  CustomerService: Symbol.for("CustomerService"),
  CustomerRepository: Symbol.for("CustomerRepository"),
  CustomerController: Symbol.for("CustomerController"),

  //-------------customertype-----------------
  CustomerTypeService: Symbol.for("CustomerTypeService"),
  CustomerTypeRepository: Symbol.for("CustomerTypeRepository"),
  CustomerTypeController: Symbol.for("CustomerTypeController"),
  //-------------customercategory-----------------
  CustomerCategoryService: Symbol.for("CustomerCategoryService"),
  CustomerCategoryRepository: Symbol.for("CustomerCategoryRepository"),
  CustomerCategoryController: Symbol.for("CustomerCategoryController"),
  //--------------farmer-------------------
  FarmerService: Symbol.for("FarmerService"),
  FarmerRepository: Symbol.for("FarmerRepository"),
  FarmerController: Symbol.for("FarmerController"),
  //---------------UOM------------------------
  UOMService: Symbol.for("UOMService"),
  UOMRepository: Symbol.for("UOMRepository"),
  UOMController: Symbol.for("UOMController"),
  //----------------------UOMConversionMatrix--------------------
  UOMConversionMatrixService: Symbol.for("UOMConversionMatrixService"),
  UOMConversionMatrixController: Symbol.for("UOMConversionMatrixController"),
  UOMConversionMatrixRepository: Symbol.for("UOMConversionMatrixRepository"),
  //--------------------------------Product_category----------------
  ProductCategoryService: Symbol.for("ProductCategoryService"),
  ProductCategoryRepository: Symbol.for("ProductCategoryRepository"),
  ProductCategoryController: Symbol.for("ProductCategoryController"),
  //---------------------------Product_Subcategory----------------------
  ProductSubcategoryService: Symbol.for("ProductSubcategoryService"), // Add this line
  ProductSubcategoryRepository: Symbol.for("ProductSubcategoryRepository"),
  ProductSubcategoryController: Symbol.for("ProductSubcategoryController"),

  //--------------------------Product--------------------------------------
  ProductService: Symbol.for("ProductService"),
  ProductRepository: Symbol.for("ProductRepository"),
  ProductController: Symbol.for("ProductController"),
//---------------------------location---------
LocationsService: Symbol.for("LocationsService"),
LocationsRepository: Symbol.for("LocationsRepository"),
LocationsController: Symbol.for("LocationsController"),
  

  //-----------------------driver----------------
  DriversService:Symbol.for("DriversService"),
  DriverRepository:Symbol.for("DriverRepository"),
  DriverController:Symbol.for("DriverController"),
  //-------------------------productClassification--------------------
  ProductClassificationService: Symbol.for("ProductClassificationService"),
  ProductClassificationRepository:Symbol.for(" ProductClassificationRepository"),
  ProductClassificationController:  Symbol.for("ProductClassificationController")
};

export { TYPES };
