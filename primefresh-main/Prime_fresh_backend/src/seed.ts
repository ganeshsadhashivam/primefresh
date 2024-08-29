import "reflect-metadata";
import { container } from "./inversify.config";
import { RoleService } from "./services/role.service";
import { UserService } from "./services/user.service";
import { Role } from "./entities/role.entity";
import { User } from "./entities/user.entity";
import { TYPES } from "./types";
import AppError from "./utils/appError";

export async function seedAdmin() {
  const userService = container.get<UserService>(TYPES.UserService);
  const roleService = container.get<RoleService>(TYPES.RoleService);

  try {
    // Ensure the ADMIN role exists
    let adminRole = await roleService.findRoleByName("ADMIN");
    if (!adminRole) {
      const roleData: Partial<Role> = { name: "ADMIN"  ,roleCode:"A"};
      adminRole = await roleService.createRole(roleData);
      console.log("Admin role created:", adminRole);
    }

    // Check if the admin user already exists
    const existingAdmin = await userService.findUserByEmail("admin@example.com");
    if (!existingAdmin) {
      const employeeId = await userService.generateEmployeeId(adminRole.id); // Ensure Role is passed
      console.log(employeeId);

      const adminData: Partial<User> = {
        firstName: "Admin",
        lastName: "Admin",
        username: "Admin",
        email: "admin@example.com",
        password: "Admin@1234",
        role: adminRole, // Assign the created ADMIN role
        phoneNumber: "1234567890",
        joiningDate: new Date("2022-01-12"), // Ensure joiningDate is a Date object
      };

      const admin = await userService.createUser({ ...adminData, employeeId });
      console.log("Admin user created:", admin);
    } else {
      console.log("Admin user already exists");
    }
  } catch (error) {
    if (error instanceof AppError) {
      console.error(`Failed to create admin user: ${error.message}`);
    } else {
      console.error("Failed to create admin user:", error);
    }
  }
}

