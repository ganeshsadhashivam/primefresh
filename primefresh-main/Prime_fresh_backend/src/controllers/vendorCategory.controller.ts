import { Request, Response, NextFunction } from "express";
import {
  controller,
  httpGet,
  httpPost,
  httpPut,
  httpDelete,
  request,
  response,
  requestBody,
  requestParam,
  next,
} from "inversify-express-utils";
import { inject } from "inversify";
import { VendorCategoryService } from "../services/vendorCategory.service";
import { VendorCategory } from "../entities/vendorCategory.entity";
import AppError from "../utils/appError";
import { TYPES } from "../types";

@controller("/vendor-categories")
export class VendorCategoryController {
  constructor(
    @inject(TYPES.VendorCategoryService)
    private vendorCategoryService: VendorCategoryService
  ) {}

  @httpPost("/")
  public async createCategory(
    @requestBody() req: Partial<VendorCategory>,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const category = await this.vendorCategoryService.create(req);
      res.status(201).json({
        status: "success",
        message: `Vendor category created successfully`,
        //data: category,
      });
    } catch (err) {
      next(err);
    }
  }

  @httpGet("/")
  public async getCategories(
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const categories = await this.vendorCategoryService.getCategories();
      if (!categories.length) {
        return next(new AppError(404, "No categories found"));
      }

      res.status(200).json({
        status: "success",
        data: categories,
      });
    } catch (err) {
      next(err);
    }
  }

  @httpGet("/:id")
  public async getCategoryById(
    @requestParam("id") id: string,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const category = await this.vendorCategoryService.getById(id);
      if (!category) {
        return next(new AppError(404, "Category not found"));
      }

      res.status(200).json({
        status: "success",
        data: category,
      });
    } catch (err) {
      next(err);
    }
  }

  @httpPut("/:id")
  public async updateCategory(
    @requestParam("id") id: string,
    @requestBody() req: Partial<VendorCategory>,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const updatedCategory = await this.vendorCategoryService.update(
        id,
        req
      );
      if (!updatedCategory) {
        return next(new AppError(404, "Category not found or update failed"));
      }

      res.status(200).json({
        status: "success",
        //data: updatedCategory,
        message: `Vendor category updated succefully`,
        
      });
    } catch (err) {
      next(err);
    }
  }

  @httpDelete("/:id")
  public async deleteCategory(
    @requestParam("id") id: string,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const success = await this.vendorCategoryService.delete(id);
      if (!success) {
        return next(new AppError(404, "Category not found"));
      }
      res.status(200).json({
        status: "success",
        message: `Vendor category  deleted successfully`,
      });
    } catch (err) {
      next(err);
    }
  }
}
