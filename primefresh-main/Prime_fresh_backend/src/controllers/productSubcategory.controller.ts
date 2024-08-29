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
import { ProductSubcategoryService } from "../services/product_subcategory.service";

@controller("/productSubcategory")
export class ProductSubcategoryController {
  constructor(
    @inject(TYPES.ProductSubcategoryService)
    private productSubcategoryService: ProductSubcategoryService
  ) {}

  @httpGet("/")
  public async getAll(@response() res: Response, @next() next: NextFunction) {
    try {
      const subcategories = await this.productSubcategoryService.getAll();
      console.log();
      if (!subcategories.length) {
        return next(new AppError(404, "No product subcategories found"));
      }
      res.status(200).json({ status: "success", data: subcategories });
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
      const subcategory = await this.productSubcategoryService.getById(id);
      if (!subcategory) {
        return next(new AppError(404, "Product subcategory not found"));
      }
      res.status(200).json({ status: "success", data: subcategory });
    } catch (err) {
      next(err);
    }
  }

  @httpPost("/")
  public async create(
    @requestBody() subcategoryData: { name: string; categoryId: string },
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const { name, categoryId } = subcategoryData;
      const subcategory = await this.productSubcategoryService.create(
        name,
        categoryId
      );
      res.status(201).json({
        status: "success",
        message: "Product subcategory created successfully",
        //data: subcategory,
      });
    } catch (err) {
      next(err);
    }
  }

  @httpPatch("/:id")
  public async update(
    @requestParam("id") id: string,
    @requestBody() subcategoryData: { name: string; categoryId: string },
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const { name, categoryId } = subcategoryData;
      const subcategory = await this.productSubcategoryService.update(
        id,
        name,
        categoryId
      );
      if (!subcategory) {
        return next(
          new AppError(404, "Product subcategory not found or update failed")
        );
      }
      res.status(200).json({
        status: "success",
        message: "Product subcategory updated successfully",
        //data: subcategory,
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
      const success = await this.productSubcategoryService.delete(id);
      if (success) {
        res.status(200).json({
          status: "success",
          message: "Product subcategory deleted successfully",
        });
      } else {
        return next(new AppError(404, "Product subcategory not found"));
      }
    } catch (err) {
      next(err);
    }
  }
}
