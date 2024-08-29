import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { DataSource, DeepPartial } from "typeorm";
import { Product } from "../entities/product.entity";
import { ProductSubcategoryService } from "./product_subcategory.service";
import { UOMService } from "./UOM.service";
import { ProductClassificationService } from "./product_classification.service";
import { ProductCategoryService } from "./product_category.service";
import { ProductInput } from "../schemas/product.schema";

@injectable()
export class ProductService {
  private productRepository = this.dataSource.getRepository(Product);

  constructor(
    @inject(TYPES.DataSource) private dataSource: DataSource,
    @inject(TYPES.ProductSubcategoryService)
    private productSubcategoryService: ProductSubcategoryService,
    @inject(TYPES.UOMService) private uomService: UOMService,
    @inject(TYPES.ProductCategoryService)
    private productCategoryService: ProductCategoryService,
    @inject(TYPES.ProductClassificationService)
    private productClassificationService: ProductClassificationService
  ) {}

  async create(dto: ProductInput): Promise<Product> {
    const {
      name,
      image,
      returnable,
      description,
      product_code,
      subcategory: subcategoryId,

      uom: uomId,
      classification: classificationId,
      category: categoryId,
    } = dto;

    // Fetch related entities if provided
    const subcategory = subcategoryId
      ? await this.productSubcategoryService.getById(subcategoryId)
      : undefined;
    const uom = uomId ? await this.uomService.getById(uomId) : undefined;
    const classification = classificationId
      ? await this.productClassificationService.getById(classificationId)
      : undefined;
    const category = categoryId
      ? await this.productCategoryService.getById(categoryId)
      : undefined;

    // Create and save new product
    const product = this.productRepository.create({
      name,
      image,
      returnable,
      description,
      product_code,
      subcategory,
      uom,
      classification,
      category,
    } as DeepPartial<Product>);

    return this.productRepository.save(product);
  }

  async getAll(): Promise<Product[]> {
    return this.productRepository.find({
      relations: ["classification", "category", "subcategory", "uom"],
    });
  }

  async getById(id: string): Promise<Product | null> {
    return this.productRepository.findOne({
      where: { id },
      relations: ["classification", "category", "subcategory", "uom"],
    });
  }

  async update(
    id: string,
    productData: Partial<Product>
  ): Promise<Product | null> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (product) {
      Object.assign(product, productData);
      return this.productRepository.save(product);
    }
    return null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.productRepository.delete(id);
    return result.affected !== 0;
  }
}
