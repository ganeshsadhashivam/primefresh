import {
  controller,
  httpGet,
  httpPost,
  httpPatch,
  httpDelete,
  request,
  response,
  requestParam,
} from "inversify-express-utils";
import { inject } from "inversify";
import { Request, Response, NextFunction } from "express";
import { SupplierService } from "../services/supplier.service";
import { TYPES } from "../types";
import { Supplier } from "../entities/supplier.entity";

@controller("/suppliers")
export class SupplierController {
  constructor(
    @inject(TYPES.SupplierService) private supplierService: SupplierService
  ) {}

  @httpGet("/")
  public async getAllSuppliers(@response() res: Response, next: NextFunction) {
    try {
      const suppliers = await this.supplierService.getAllSuppliers();
      return res.json(suppliers);
    } catch (error) {
      next(error);
    }
  }

  @httpGet("/:id")
  public async getSupplierById(
    @requestParam("id") id: string,
    @response() res: Response,
    next: NextFunction
  ) {
    try {
      const supplier = await this.supplierService.getSupplierById(id);
      if (!supplier) {
        return res.status(404).json({ message: "Supplier not found" });
      }
      return res.json(supplier);
    } catch (error) {
      next(error);
    }
  }

  @httpPost("/")
  public async createSupplier(
    @request() req: Request,
    @response() res: Response,
    next: NextFunction
  ) {
    try {
      console.log(req.body);
      const supplierData: Supplier = req.body;
      const newSupplier = await this.supplierService.createSupplier(
        supplierData
      );
      console.log("new suppiler is ", newSupplier);
      return res.status(201).json(newSupplier);
    } catch (error) {
      next(error);
    }
  }

  @httpPatch("/:id")
  public async updateSupplier(
    @requestParam("id") id: string,
    @request() req: Request,
    @response() res: Response,
    next: NextFunction
  ) {
    try {
      const supplierData: Supplier = req.body;
      const updatedSupplier = await this.supplierService.updateSupplier(
        id,
        supplierData
      );
      if (!updatedSupplier) {
        return res.status(404).json({ message: "Supplier not found" });
      }
      return res.json(updatedSupplier);
    } catch (error) {
      next(error);
    }
  }

  @httpDelete("/:id")
  public async deleteSupplier(
    @requestParam("id") id: number,
    @response() res: Response,
    next: NextFunction
  ) {
    try {
      const deleted = await this.supplierService.deleteSupplier(id);
      if (!deleted) {
        return res.status(404).json({ message: "Supplier not found" });
      }
      return res.json({ message: "Supplier deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}
