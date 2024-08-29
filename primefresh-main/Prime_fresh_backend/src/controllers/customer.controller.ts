import { inject } from "inversify";
import {
  controller,
  httpDelete,
  httpGet,
  httpPatch,
  httpPost,
  next,
  request,
  requestBody,
  requestParam,
  response,
} from "inversify-express-utils";
import { CustomerService } from "../services/customer.service";
import { TYPES } from "../types";
import AppError from "../utils/appError";
import { NextFunction,  Request, Response } from "express";
import { CreateCustomerInput, createCustomerSchema, customerSchema, UpdateCustomerInput } from "../schemas/customer.schema";
import { validate } from "../middleware/validate";
import { userSchema } from "../schemas/user.schema";

@controller("/customers")
export class CustomerController {
  constructor(
    @inject(TYPES.CustomerService)
    private customerService: CustomerService
  ) {}

  @httpGet("/")
  public async getAll(@response() res: Response, @next() next: NextFunction) {
    try {
      const customers = await this.customerService.getAll();
      if (customers.length === 0) {
        return next(new AppError(404, "No customers found"));
      }

      res.status(200).json({
        status: "success",
        data: customers,
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
      const customer = await this.customerService.getById(id);
      if (!customer) {
        return next(new AppError(404, "Customer not found"));
      }

      res.status(200).json({
        status: "success",
        data: customer,
      });
    } catch (err) {
      next(err);
    }
  }

  
@httpPost("/")
public async create(
  @requestBody() customerData: CreateCustomerInput,
  @response() res: Response,
  @next() next: NextFunction
) {
  try {
    // Parse the customer data using Zod schema
    const parsedData = createCustomerSchema.parse(customerData);

    // Create the customer using the parsed data
    const customer = await this.customerService.create(parsedData);

    // Send a successful response
    res.status(201).json({
      status: "success",
      message: "Customer created successfully",
      //data: customer,
    });
  } catch (err) {
    next(err);
  }
}


  @httpPatch("/:id")
  public async update(
    @requestParam("id") id: string,
    @request() req: Request<{}, {},UpdateCustomerInput>,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const customerData=req.body;
      const parsedData = customerSchema.parse(customerData);
      console.log("customerdata:  ",customerData)
      const customer = await this.customerService.update(id, parsedData);
      if (!customer) {
        return next(new AppError(404, "Customer not found or update failed"));
      }

      res.status(200).json({
        status: "success",
        //data: customer,
        message: "Customer updated successfully",
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
    

    await this.customerService.delete(id);
    res.status(200).json({
      status: "success",
      message: "Customer deleted successfully",
    });
  } catch (err) {
    next(err);
  }
}

}
