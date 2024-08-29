import { Request, Response, NextFunction } from "express";
import {
  controller,
  httpGet,
  httpPost,
  httpPatch,
  httpDelete,
  request,
  response,
  requestParam,
  next,
} from "inversify-express-utils";
import { inject } from "inversify";
import { TYPES } from "../types";
import { CustomerTypeService } from "../services/customerType.service";
import AppError from "../utils/appError";

@controller("/customerType")
export class CustomerTypeController {
  constructor(
    @inject(TYPES.CustomerTypeService)
    private customerTypeService: CustomerTypeService
  ) {}

  @httpGet("/")
  public async getAllCustomerTypes(
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const customerTypes =
        await this.customerTypeService.getAllCustomerTypes();
      if (!customerTypes.length) {
        return next(new AppError(404, "No customer types found"));
      }

      res.status(200).json({
        status: "success",
        data: customerTypes,
      });
    } catch (err) {
      next(err);
    }
  }

  @httpGet("/:id")
  public async getCustomerTypeById(
    @requestParam("id") id: string,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const customerType = await this.customerTypeService.getCustomerTypeById(
        id
      );
      if (!customerType) {
        return next(new AppError(404, "Customer type not found"));
      }

      res.status(200).json({
        status: "success",
        data: customerType,
      });
    } catch (err) {
      next(err);
    }
  }

  @httpPost("/")
  public async createCustomerType(
    @request() req: Request,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const { name } = req.body;
      const customerType = await this.customerTypeService.createCustomerType(
        name
      );
      res.status(201).json({
        status: "success",
        //data: customerType,
        message: "Customer type created successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  @httpPatch("/:id")
  public async updateCustomerType(
    @requestParam("id") id: string,
    @request() req: Request,
    @response() res: Response,
    @next() next: NextFunction
  ) 
  {
    try {
      const { name } = req.body;
      const updatedCustomerType =
        await this.customerTypeService.updateCustomerType(id, name);
      if (!updatedCustomerType) {
        return next(
          new AppError(404, "Customer type not found or update failed")
        );
      }

      res.status(200).json({
        status: "success",
        //data: updatedCustomerType,
        message: "Customer type updated successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  @httpDelete("/:id")
  public async deleteCustomerType(
    @requestParam("id") id: string,
    @response() res: Response,
    @next() next: NextFunction
  ) 
  {
    try {
      const success = await this.customerTypeService.deleteCustomerType(id);
      res.status(200).json({
        status: "success",
        message: "Customer Type deleted successfully",
      });
      
    } catch (err) {
      next(err);
    }
  }
}



