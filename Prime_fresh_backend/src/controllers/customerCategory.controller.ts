import { Request, Response, NextFunction } from "express";
import {
  controller,
  httpGet,
  httpPost,
  httpPut,
  httpDelete,
  requestBody,
  requestParam,
  response,
  next,
  httpPatch,
} from "inversify-express-utils";
import { inject } from "inversify";
import { TYPES } from "../types";
import { CustomerCategoryService } from "../services/customerCategory.service";
import AppError from "../utils/appError"; // Assuming you have a custom error class
import { CustomerCategory } from "../entities/customerCategory.entity";

@controller("/customerCategory")
export class CustomerCategoryController {
  constructor(
    @inject(TYPES.CustomerCategoryService)
    private customerCategoryService: CustomerCategoryService
  ) {}

  @httpGet("/")
  public async getAll(@response() res: Response, @next() next: NextFunction) {
    try {
      const categories = await this.customerCategoryService.getAll();
      if (!categories.length) {
        return next(new AppError(404, "No customer categories found"));
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
  public async getById(
    @requestParam("id") id: string,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const category = await this.customerCategoryService.getById(id);
      if (!category) {
        return next(new AppError(404, "Customer category not found"));
      }

      res.status(200).json({
        status: "success",
        data: category,
      });
    } catch (err) {
      next(err);
    }
  }

  @httpPost("/")
  public async create(
    @requestBody() categoryData: Partial<CustomerCategory>,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const category = await this.customerCategoryService.create(categoryData);
      res.status(201).json({
        status: "success",
        //data: category,
        message: "Customer Category created successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  @httpPatch("/:id")
  public async update(
    @requestParam("id") id: string,
    @requestBody() categoryData: Partial<CustomerCategory>,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const category = await this.customerCategoryService.update(
        id,
        categoryData
      );
      if (!category) {
        return next(
          new AppError(404, "Customer category not found or update failed")
        );
      }

      res.status(200).json({
        status: "success",
        // data: category,
        message: "Customer Category updated successfully",
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
      const success = await this.customerCategoryService.delete(id);
      res.status(200).json({
        status: "success",
        message: "Customer Category deleted successfully",
      });
    } catch (err) {
      next(err);
    }
  }
}
