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
  httpPatch,
} from "inversify-express-utils";
import { inject } from "inversify";

import AppError from "../utils/appError";
import { VendorSubcategoryService } from "../services/vendorSubcategory.service";
import { VendorSubcategory } from "../entities/vendorSubcategory.entity";
import { TYPES } from "../types";

@controller("/vendor-subcategories")
export class VendorSubcategoryController {
  constructor(
    @inject(TYPES.VendorSubcategoryService)
    private subcategoryService: VendorSubcategoryService
  ) {}

  @httpPost("/")
  public async createSubcategory(
    @requestBody() req: { name: string; categoryId: string },
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const { name, categoryId } = req;
      const subcategoryData: Partial<VendorSubcategory> = { name };
      const subcategory = await this.subcategoryService.create(subcategoryData, categoryId);
      res.status(201).json({
        status: "success",
        //data: subcategory,
        message: `Vendor subcategory created successfully`,
      });
    } catch (err) {
      next(err);
    }
  }

  @httpGet("/")
  public async getAllSubcategories(
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const subcategories = await this.subcategoryService.getSubcategories();
      res.status(200).json({
        status: "success",
        data: subcategories,
      });
    } catch (err) {
      next(err);
    }
  }

  @httpGet("/:id")
  public async getSubcategoryById(
    @requestParam("id") id: string,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const subcategory = await this.subcategoryService.getById(id);
      if (!subcategory) {
        return next(new AppError(404, "Subcategory not found"));
      }
      res.status(200).json({
        status: "success",
        data: subcategory,
      });
    } catch (err) {
      next(err);
    }
  }

  @httpPatch("/:id")
  public async updateSubcategory(
    @requestParam("id") id: string,
    @requestBody() body: Partial<VendorSubcategory>,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const updatedSubcategory = await this.subcategoryService.update(id, body);
      if (!updatedSubcategory) {
        return next(new AppError(404, "Subcategory not found"));
      }
      res.status(200).json({
        status: "success",
        //data: updatedSubcategory,
        message: `Vendor subcategory updated successfully`,
      });
    } catch (err) {
      next(err);
    }
  }

  @httpDelete("/:id")
  public async deleteSubcategory(
    @requestParam("id") id: string,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const success = await this.subcategoryService.delete(id);
      if (!success) {
        return next(new AppError(404, "Subcategory not found"));
      }
      res.status(200).json({
        status: "success",
        message: `Vendor subcategory deleted successfully`,
      });
    } catch (err) {
      next(err);
    }
  }
}
