import { Request, Response, NextFunction } from "express";
import {
  controller,
  httpGet,
  httpPost,
  request,
  response,
  requestParam,
  next,
  httpDelete,
  httpPatch,
} from "inversify-express-utils";
import { inject } from "inversify";

import {
  CreateUserInput,
  UpdateUserInput,
  userSchema,
} from "../schemas/user.schema";
import AppError from "../utils/appError";
import { UserService } from "../services/user.service";
import { TYPES } from "../types";
import { EmployeeStatus } from "../entities/user.entity";

@controller("/employee")
export class UserController {
  constructor(@inject(TYPES.UserService) private userService: UserService) {}

  @httpPost("/")
  public async createUser(
    @request() req: Request<{}, {}, CreateUserInput>,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const result = req.body;
      // console.log(result);
      const user = await this.userService.createUser(result);
      console.log(user);
      if (!user) {
        return next(new AppError(400, "User could not be created"));
      }

      res.status(201).json({
        status: "success",
        message: "User created successfully",
        //data: user,
      });
    } catch (err) {
      next(err);
    }
  }

  @httpGet("/")
  public async getAllUsers(
    @request() req: Request,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const users = await this.userService.getAllUsers();
      if (!users || users.length === 0) {
        return next(new AppError(404, "Users Not Found"));
      }

      res.status(200).json({
        status: "success",
        data: users,
      });
    } catch (err) {
      next(err);
    }
  }

  @httpGet("/:id")
  public async getUserById(
    @requestParam("id") id: string,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const user = await this.userService.findUserById(id);

      if (!user) {
        return next(new AppError(404, "User not found"));
      }

      res.status(200).json({
        status: "success",
        data: user,
      });
    } catch (err) {
      next(err);
    }
  }

  @httpPatch("/:id")
  public async updateUser(
    @requestParam("id") id: string,
    @request() req: Request<{}, {}, UpdateUserInput>,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      console.log("handler id is ", id);
      // Validate userData against schema
      const userData = req.body;
      const parsedData = userSchema.parse(userData);

      console.log(userData);
      const updatedUser = await this.userService.updateUser(id, parsedData);

      if (!updatedUser) {
        return next(
          new AppError(404, "User not found or could not be updated")
        );
      }

      res.status(200).json({
        status: "success",
        message: "User updated successfully",
        //user: updatedUser,
      });
    } catch (err) {
      next(err);
    }
  }

  @httpDelete("/:id")
  public async deleteUser(
    @requestParam("id") id: string,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const result = await this.userService.deleteUser(id);

      if (!result) {
        return next(
          new AppError(404, "User not found or could not be deleted")
        );
      }

      res.status(200).json({
        status: "success",
        message: "Employee has been deleted",
      });
    } catch (err) {
      next(err);
    }
  }

  //to get password and employee Id
  @httpPatch("/employeeCredential/:id")
  public async getEmpIDandPass(
    @requestParam("id") id: string,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      // Fetch user by ID
      const user = await this.userService.findUserById(id);

      if (!user) {
        return next(new AppError(404, "User not found"));
      }

      // Decrypt the password
      //const decryptedPassword = user.decryptPassword(user.password);
      // user.employeeStatus = EmployeeStatus.ACTIVE;

      // Set employeeStatus to ACTIVE
      user.employeeStatus = EmployeeStatus.ACTIVE;

      // await this.userService.upadateEmployeeState(id);

      // Save the updated user object back to the database
      await this.userService.updateUser(id, user);

      res.status(200).json({
        status: "success",
        data: {
          // employeeCode: user.employeeCode,
          // password: user.password,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}
