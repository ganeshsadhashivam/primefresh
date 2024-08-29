import { inject } from "inversify";
import {
  controller,
  httpGet,
  httpPost,
  httpPatch,
  httpDelete,
  requestBody,
  requestParam,
  response,
  next,
} from "inversify-express-utils";
import { TYPES } from "../types";
import { ProductService } from "../services/product.service";
import { Product } from "../entities/product.entity";
import AppError from "../utils/appError";
import { NextFunction, request, Response } from "express";
import { ProductInput } from "../schemas/product.schema";

@controller("/products")
export class ProductController {
  constructor(
    @inject(TYPES.ProductService) private productService: ProductService
  ) {}

  @httpGet("/")
  public async getAll(@response() res: Response, @next() next: NextFunction) {
    try {
      const products = await this.productService.getAll();
      res.status(200).json({ status: "success", data: products });
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
      const product = await this.productService.getById(id);
      if (!product) {
        return next(new AppError(404, "Product not found"));
      }
      res.status(200).json({ status: "success", data: product });
    } catch (err) {
      next(err);
    }
  }

  @httpPost("/")
  public async create(
    @requestBody() productData: ProductInput,
    
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      //console.log(productData)
      const product = await this.productService.create(productData);
      res.status(201).json({
        status: "success",
        message: "Product created successfully",
        //data: product,  // Optionally include the product data if needed
      });
    } catch (err) {
      next(err);
    }
  }

  @httpPatch("/:id")
  public async update(
    @requestParam("id") id: string,
    @requestBody() productData: Partial<Product>,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const product = await this.productService.update(id, productData);
      if (!product) {
        return next(new AppError(404, "Product not found or update failed"));
      }
      res.status(200).json({
        status: "success",
        message: "Product updated successfully",
        data: product,
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
      const success = await this.productService.delete(id);
      if (!success) {
        return next(new AppError(404, "Product not found"));
      }
      res.status(200).json({
        status: "success",
        message: "Product deleted successfully",
      });
    } catch (err) {
      next(err);
    }
  }
}