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
  request,
} from "inversify-express-utils";
import { FarmerService } from "../services/farmer.service";
import { TYPES } from "../types";
import { Request, Response, NextFunction } from "express";
import { Farmer } from "../entities/farmer.entity";
import AppError from "../utils/appError";
import { validate } from "../middleware/validate";
import { farmerSchema, UpdateFarmerInput } from "../schemas/farmer.schema";

@controller("/farmers")
export class FarmerController {
  constructor(
    @inject(TYPES.FarmerService)
    private farmerService: FarmerService
  ) {}

  @httpGet("/")
  public async getAll(@response() res: Response, @next() next: NextFunction) {
    try {
      const farmers = await this.farmerService.getAll();
      if (!farmers.length) {
        return next(new AppError(404, "No farmers found"));
      }

      res.status(200).json({
        status: "success",
        data: farmers,
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
      const farmer = await this.farmerService.getById(id);
      if (!farmer) {
        return next(new AppError(404, "Farmer not found"));
      }

      res.status(200).json({
        status: "success",
        data: farmer,
      });
    } catch (err) {
      next(err);
    }
  }

  @httpPost("/")
  public async create(
    @requestBody() farmerData: Partial<Farmer>,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const farmer = await this.farmerService.create(farmerData);
      res.status(201).json({
        status: "success",
        //data: farmer,
        message: "Farmer created successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  @httpPatch("/:id")
  public async update(
    @requestParam("id") id: string,
    @request() req: Request<{}, {},UpdateFarmerInput>,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const farmerData=req.body;
      const parsedData = farmerSchema.parse(farmerData);
      console.log("farmerdata:  ",parsedData)
      const farmer = await this.farmerService.updateFarmer(id, parsedData);
      if (!farmer) {
        return next(new AppError(404, "Farmer not found or update failed"));
      }

      res.status(200).json({
        status: "success",
        //data: farmer,
        message: "Farmer updated successfully",
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
      const success = await this.farmerService.delete(id);
      res.status(200).json({
        status: "success",
        message: "Farmer deleted successfully",
      });
    } catch (err) {
      next(err);
    }
  }
}
