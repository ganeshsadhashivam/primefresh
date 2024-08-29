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
import { Request, Response, NextFunction } from "express";
import { UOM } from "../entities/uom.entity";
import AppError from "../utils/appError";
import { UOMService } from "../services/UOM.service";


@controller("/uoms")
export class UOMController {
  constructor(
    @inject(TYPES.UOMService)
    private uomService: UOMService
  ) {}

  @httpGet("/")
  public async getAll(@response() res: Response, @next() next: NextFunction) {
    try {
      const uoms = await this.uomService.getAll();
      if (!uoms.length) {
        return next(new AppError(404, "No UOMs found"));
      }

      res.status(200).json({
        status: "success",
        data: uoms,
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
      const uom = await this.uomService.getById(id);
      if (!uom) {
        return next(new AppError(404, "UOM not found"));
      }

      res.status(200).json({
        status: "success",
        data: uom,
      });
    } catch (err) {
      next(err);
    }
  }

  @httpPost("/")
  public async create(
    @requestBody() uomData: Partial<UOM>,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const uom = await this.uomService.create(uomData);
      res.status(201).json({
        status: "success",
        message: "UOM created successfully",
        //data: uom,
      });
    } catch (err) {
      next(err);
    }
  }

  @httpPatch("/:id")
  public async update(
    @requestParam("id") id: string,
    @requestBody() uomData: Partial<UOM>,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const uom = await this.uomService.update(id, uomData);
      if (!uom) {
        return next(new AppError(404, "UOM not found or update failed"));
      }

      res.status(200).json({
        status: "success",
        message: "UOM updated successfully",
        //data: uom,
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
      const success = await this.uomService.delete(id);
      if (success) {
        res.status(204).json({
          status: "success",
          message: "UOM deleted successfully"
        });
      } else {
        return next(new AppError(404, "UOM not found"));
      }
    } catch (err) {
      next(err);
    }
  }
}
