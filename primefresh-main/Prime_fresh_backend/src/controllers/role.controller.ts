import { Request, Response, NextFunction } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPost, httpPatch, httpDelete } from "inversify-express-utils";
import { RoleService } from "../services/role.service";
import { TYPES } from "../types";
import { Role } from "../entities/role.entity";
import AppError from "../utils/appError";

@controller("/roles")
export class RoleController {
  constructor(
    @inject(TYPES.RoleService) private roleService: RoleService
  ) {}

  @httpGet("/")
  public async getAllRoles(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const roles = await this.roleService.findAllRoles();
      res.status(200).json({
        status: "success",
        data: roles
      });
    } catch (error) {
      next(error); // Pass the error to the global error handler
    }
  }

  @httpGet("/:id")
  public async getRoleById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const roleId = req.params.id;
      const role = await this.roleService.findRoleById(roleId);
      if (!role) {
        throw new AppError(404, "Role not found");
      }
      res.status(200).json({
        status: "success",
        data: role
      });
    } catch (error) {
      next(error); // Pass the error to the global error handler
    }
  }

  @httpPost("/")
  public async createRole(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const roleData: Partial<Role> = req.body;
      const newRole = await this.roleService.createRole(roleData);
      res.status(201).json({
        status: "success",
        message: "Role created successfully",
        data: newRole
      });
    } catch (error) {
      next(error); // Pass the error to the global error handler
    }
  }

  @httpPatch("/:id")
  public async updateRole(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const roleId = req.params.id;
      const roleData: Partial<Role> = req.body;
      const updatedRole = await this.roleService.updateRole(roleId, roleData);
      if (!updatedRole) {
        throw new AppError(404, "Role not found or update failed");
      }
      res.status(200).json({
        status: "success",
        message: "Role updated successfully",
        data: updatedRole
      });
    } catch (error) {
      next(error); // Pass the error to the global error handler
    }
  }

  @httpDelete("/:id")
  public async deleteRole(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const roleId = req.params.id;
      await this.roleService.deleteRole(roleId);
      res.status(200).json({
        status: "success",
        message: "Role deleted successfully"
      });
    } catch (error) {
      next(error); // Pass the error to the global error handler
    }
  }
}
