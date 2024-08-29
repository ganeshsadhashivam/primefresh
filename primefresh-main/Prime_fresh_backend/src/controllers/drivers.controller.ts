import { controller, httpPost, httpGet, httpPatch, httpDelete, requestParam, requestBody, request, response, next } from 'inversify-express-utils';
import { Request, Response, NextFunction } from 'express';
import { inject } from 'inversify';
import { DriversService } from '../services/driver.service';
import { Drivers } from '../entities/driver.entity';
import { TYPES } from '../types';
import AppError from '../utils/appError';
import { driverSchema, UpdateDriverInput } from '../schemas/drivers.schema';

@controller('/drivers')
export class DriverController {
  constructor(
    @inject(TYPES.DriversService)
    private driversService: DriversService
  ) {}
  @httpGet('/')
  public async getDrivers(
    
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const driver = await this.driversService.getAllDrivers();
      if (!driver) {
        return next(new AppError(404, 'Driver not found'));
      }
      return res.status(200).json({
        status: 'success',
        data: driver,
      });
    } catch (error) {
      next(error);
    }
  }

  @httpPost('/')
  public async createDriver(
    @requestBody() driverData: Partial<Drivers>,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const driver = await this.driversService.createDriver(driverData);
      return res.status(201).json({
        status: 'success',
        message: 'Driver created successfully',
        //data: driver,
      });
    } catch (error) {
      next(error);
    }
  }

  @httpGet('/:id')
  public async getDriver(
    @requestParam('id') id: string,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const driver = await this.driversService.findDriverById(id);
      if (!driver) {
        return next(new AppError(404, 'Driver not found'));
      }
      return res.status(200).json({
        status: 'success',
        data: driver,
      });
    } catch (error) {
      next(error);
    }
  }

  @httpPatch('/:id')
  public async updateDriver(
    
    @requestParam("id") id: string,
    @request() req: Request<{}, {},UpdateDriverInput>,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const driverData=req.body;
      const parsedData = driverSchema.parse(driverData);
      console.log("driverdata:  ",driverData)
      const updatedDriver = await this.driversService.updateDriver(id, parsedData);
      if (!updatedDriver) {
        return next(new AppError(404, 'Driver not found or update failed'));
      }
      return res.status(200).json({
        status: 'success',
        message: 'Driver updated successfully',
        //data: updatedDriver,
      });
    } catch (error) {
      next(error);
    }
  }

  @httpDelete('/:id')
  public async deleteDriver(
    @requestParam('id') id: string,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const driver = await this.driversService.findDriverById(id);
      if (!driver) {
        return next(new AppError(404, 'Driver not found'));
      }

      await this.driversService.deleteDriver(id);
      return res.status(200).json({
        status: 'success',
        message: 'Driver deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}
