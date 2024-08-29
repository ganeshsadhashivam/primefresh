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

import AppError from "../utils/appError";
import { UOMConversionMatrixService } from "../services/UOMconversionMatrix.service";
import { UOMConversionMatrix } from "../entities/uom_matrix.entity";

@controller("/uom-conversion-matrix")
export class UOMConversionMatrixController {
  constructor(
    @inject(TYPES.UOMConversionMatrixService)
    private uomConversionMatrixService: UOMConversionMatrixService
  ) {}

  @httpGet("/")
  public async getAll(@response() res: Response, @next() next: NextFunction) {
    try {
      const conversions = await this.uomConversionMatrixService.getAll();
      if (!conversions.length) {
        return next(new AppError(404, "No UOM conversion data found"));
      }

      res.status(200).json({
        status: "success",
        data: conversions,
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
      const conversion = await this.uomConversionMatrixService.getById(id);
      if (!conversion) {
        return next(new AppError(404, "UOM conversion data not found"));
      }

      res.status(200).json({
        status: "success",
        data: conversion,
      });
    } catch (err) {
      next(err);
    }
  }

  @httpPost("/")
  public async create(
    @requestBody() conversionData: Partial<UOMConversionMatrix>,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const conversion = await this.uomConversionMatrixService.create(
        conversionData
      );
      res.status(201).json({
        status: "success",
        //data: conversion,
        message: "UOM conversion data created successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  @httpPatch("/:id")
  public async update(
    @requestParam("id") id: string,
    @requestBody() conversionData: Partial<UOMConversionMatrix>,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const conversion = await this.uomConversionMatrixService.update(
        id,
        conversionData
      );
      if (!conversion) {
        return next(
          new AppError(404, "UOM conversion data not found or update failed")
        );
      }

      res.status(200).json({
        status: "success",
        //data: conversion,
        message: "UOM conversion data updated successfully",
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
      const success = await this.uomConversionMatrixService.delete(id);
      if (success) {
        res.status(200).json({
          status: "success",
          message: "UOM conversion data deleted successfully"
        });
      } else {
        return next(new AppError(404, "UOM conversion data not found"));
      }
    } catch (err) {
      next(err);
    }
  }
}
