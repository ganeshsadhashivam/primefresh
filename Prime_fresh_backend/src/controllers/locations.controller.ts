import { Request, Response, NextFunction } from "express";
import {
  controller,
  httpGet,
  httpPost,
  httpPatch,
  httpDelete,
  requestParam,
  request,
  response,
  next,
} from "inversify-express-utils";
import { inject } from "inversify";
import { LocationsService } from "../services/locations.service";
import { TYPES } from "../types";
import AppError from "../utils/appError";
import { LocationType } from "../entities/location.entity";

@controller("/locations")
export class LocationsController {
  constructor(
    @inject(TYPES.LocationsService) private locationsService: LocationsService
  ) {}

  @httpGet("/")
  public async getAllLocations(
    @request() req: Request,
    @response() res: Response,
    @next() next: NextFunction
  ): Promise<void> {
    try {
      const locations = await this.locationsService.getAllLocations();
      if (!locations || locations.length === 0) {
        return next(new AppError(404, "Locations not found"));
      }

      res.status(200).json({
        status: "success",
        data: locations,
      });
    } catch (err) {
      next(err);
    }
  }

  @httpGet("/:id")
  public async getLocationById(
    @requestParam("id") id: string,
    @request() req: Request,
    @response() res: Response,
    @next() next: NextFunction
  ): Promise<void> {
    try {
      const location = await this.locationsService.getLocationById(id);
      if (!location) {
        return next(new AppError(404, "Location not found"));
      }

      res.status(200).json({
        status: "success",
        data: location,
      });
    } catch (err) {
      next(err);
    }
  }

  @httpPost("/")
  public async createLocation(
    @request() req: Request,
    @response() res: Response,
    @next() next: NextFunction
  ): Promise<void> {
    try {
      const locationData = req.body;
      const location = await this.locationsService.createLocation(locationData);

      if (!location) {
        return next(new AppError(400, "Location could not be created"));
      }

      res.status(201).json({
        status: "success",
        message: "Location created successfully",
        data: location,
      });
    } catch (err) {
      next(err);
    }
  }

  @httpPatch("/:id")
  public async updateLocation(
    @requestParam("id") id: string,
    @request() req: Request,
    @response() res: Response,
    @next() next: NextFunction
  ): Promise<void> {
    try {
      const locationData = req.body;
      const updatedLocation = await this.locationsService.updateLocation(id, locationData);

      if (!updatedLocation) {
        return next(
          new AppError(404, "Location not found or could not be updated")
        );
      }

      res.status(200).json({
        status: "success",
        message: "Location updated successfully",
        data: updatedLocation,
      });
    } catch (err) {
      next(err);
    }
  }

  @httpDelete("/:id")
  public async deleteLocation(
    @requestParam("id") id: string,
    @response() res: Response,
    @next() next: NextFunction
  ): Promise<void> {
    try {
      const success = await this.locationsService.deleteLocation(Number(id));

      if (!success) {
        return next(
          new AppError(404, "Location not found or could not be deleted")
        );
      }

      res.status(200).json({
        status: "success",
        message: "Location deleted successfully",
      });
    } catch (err) {
      next(err);
    }
  }
  @httpGet("/type/:type")
  public async getLocationsByType(
    @requestParam("type") type: LocationType,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const locations = await this.locationsService.getLocationsByType(type);
      if (!locations || locations.length === 0) {
        return next(new AppError(404, "No locations found for this type"));
      }

      res.status(200).json({
        status: "success",
        data: locations,
      });
    } catch (error) {
      next(error);
    }
  }
}
