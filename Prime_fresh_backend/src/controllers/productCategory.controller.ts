import { inject } from "inversify";
import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
  requestBody,
  requestParam,
  response,
  next,
  httpPatch,
} from "inversify-express-utils";

import { TYPES } from "../types";
import AppError from "../utils/appError";
import { NextFunction, Response } from "express";
import { ProductCategoryService } from "../services/product_category.service";
import { ProductCategory } from "../entities/product_category.entity";
import { CreateProductCategoryDTO } from "../dtos/product-category.dto";

@controller("/productCategory")
export class ProductCategoryController {
  constructor(
    @inject(TYPES.ProductCategoryService)
    private productCategoryService: ProductCategoryService
  ) {}

  @httpGet("/")
  public async getAll(@response() res: Response, @next() next: NextFunction) {
    try {
      const categories = await this.productCategoryService.getAll();
      if (!categories.length) {
        return next(new AppError(404, "No product categories found"));
      }
      res.status(200).json({ status: "success", data: categories });
    } catch (err) {
      next(err);
    }
  }

  @httpGet("/:id")
  public async getById(
    @requestParam("id") id: string,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const category = await this.productCategoryService.getById(id);
      if (!category) {
        return next(new AppError(404, "Product category not found"));
      }
      res.status(200).json({ status: "success", data: category });
    } catch (err) {
      next(err);
    }
  }

  @httpPost("/")
  public async create(
    @requestBody() categoryData: CreateProductCategoryDTO,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      console.log(categoryData)
      const category = await this.productCategoryService.create(categoryData);
      res.status(201).json({ status: "success", 
        //data: category
        message: "Product category created successfully",
       });
    } catch (err) {
      next(err);
    }
  }

  @httpPatch("/:id")
  public async update(
    @requestParam("id") id: string,
    @requestBody() categoryData: Partial<ProductCategory>,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const { name } = categoryData;
      if (!name) {
        return next(new AppError(400, "Name is required")); // Handle missing name
      }
      const category = await this.productCategoryService.update(id, name);
      if (!category) {
        return next(
          new AppError(404, "Product category not found or update failed")
        );
      }
      res.status(200).json({ status: "success",
         //data: category 
         message: "Product category updated successfully",
        });
    } catch (err) {
      next(err);
    }
  }

  @httpDelete("/:id")
  public async delete(
    @requestParam("id") id: string,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const success = await this.productCategoryService.delete(id);
      if (success) {
        res.status(200).json({
          status: "success",
          message: "Product category deleted successfully",
        });
      } else {
        return next(new AppError(404, "Product category not found"));
      }
    } catch (err) {
      next(err);
    }
  }
}
