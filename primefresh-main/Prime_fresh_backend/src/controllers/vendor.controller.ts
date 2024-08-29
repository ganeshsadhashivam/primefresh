import { Request, Response, NextFunction } from "express";
import { VendorService } from "../services/vendor.service";
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
import { TYPES } from "../types";
import AppError from "../utils/appError";
import { Vendor } from "../entities/vendor.entity";
import { CreateVendorInput, CreatevendorSchema } from "../schemas/vendor.schema";
import { validate } from "../middleware/validate";

@controller("/vendors")
export class VendorController {
  constructor(
    @inject(TYPES.VendorService)
    private vendorService: VendorService
  ) {}

  @httpGet("/:id")
  public async getVendorById(
    @requestParam("id") id: string,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const vendor = await this.vendorService.getVendorById(id);
      if (!vendor) {
        return next(new AppError(404, "Vendor not found"));
      }
      res.status(200).json({
        status: "success",
        data: vendor,
      });
    } catch (error) {
      next(error);
    }
  }

  @httpGet("/")
  public async getAllVendors(
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const vendors = await this.vendorService.getAllVendors();
      res.status(200).json({
        status: "success",
        data: vendors,
      });
    } catch (error) {
      next(error);
    }
  }

  @httpPost("/", validate(CreatevendorSchema))
public async createVendor(
  @requestBody() VendorData: CreateVendorInput,
  @response() res: Response,
  @next() next: NextFunction
) {
  try {
    // Call the service to create a vendor
    const vendor = await this.vendorService.createVendor(VendorData);
    
    res.status(201).json({
      status: "success",
      message: "Vendor created successfully",
      //data: vendor,
    });
  } catch (error) {
    console.error("Error creating vendor:", error);
    next(error);
  }
}
  @httpPatch("/:id")
  public async updateVendor(
    @requestParam("id") id: string,
    @requestBody() req: Partial<Vendor>,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const updatedVendor = await this.vendorService.updateVendor(id, req);
      if (!updatedVendor) {
        return next(new AppError(404, "Vendor not found or update failed"));
      }
      res.status(200).json({
        status: "success",
        message: "Vendor updated successfully",
        //data: updatedVendor,
      });
    } catch (error) {
      next(error);
    }
  }

  @httpDelete("/:id")
  public async deleteVendor(
    @requestParam("id") id: string,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      await this.vendorService.deleteVendor(id);
      res.status(200).json({
        status: "success",
        message: "Vendor deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}
