// src/controllers/product_classification.controller.ts
import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { ProductClassificationService } from "../services/product_classification.service";
import { ProductClassification } from "../entities/product_classification.entity";
import AppError from "../utils/appError";
import { controller, httpGet, httpPost, httpPut, httpDelete, httpPatch } from "inversify-express-utils";

@controller("/productClassification")
export class ProductClassificationController {
  constructor(
    @inject(TYPES.ProductClassificationService) private productClassificationService: ProductClassificationService
  ) {}

  @httpGet("/")
  public async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const classifications = await this.productClassificationService.findAll();
      console.log(classifications)
      res.status(200).json(classifications);
    } catch (error) {
      next(new AppError(500, "Error fetching classifications"));
    }
  }

  @httpGet("/:id")
  public async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const classification = await this.productClassificationService.findById(req.params.id);
      if (classification) {
        res.status(200).json(classification);
      } else {
        next(new AppError(404, "Classification not found"));
      }
    } catch (error) {
      next(new AppError(500, "Error fetching classification"));
    }
  }

  @httpPost("/")
  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const productClassificationData: Partial<ProductClassification> = req.body;
      const newClassification = await this.productClassificationService.create(productClassificationData);
      res.status(201).json({
        status: "success",
        message: "Product classification created successfully",
        //data: newClassification,
      });
    } catch (error) {
      next(new AppError(500, "Error creating classification"));
    }
  }

  @httpPatch("/:id")
  public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const updatedClassification = await this.productClassificationService.update(req.params.id, req.body);
      if (updatedClassification) {
        res.status(200).json({
          status: "success",
          message: "Product classification updated successfully",
         // data: updatedClassification,
        });
      } else {
        next(new AppError(404, "Classification not found"));
      }
    } catch (error) {
      next(new AppError(500, "Error updating classification"));
    }
  }

  @httpDelete("/:id")
  public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const success = await this.productClassificationService.delete(req.params.id);
      if (success) {
        res.status(200).json({
          status: "success",
          message: "Product classification deleted successfully",
        });
      } else {
        next(new AppError(404, "Classification not found"));
      }
    } catch (error) {
      next(new AppError(500, "Error deleting classification"));
    }
  }
}
