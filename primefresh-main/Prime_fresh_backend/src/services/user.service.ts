import { inject, injectable } from "inversify";
import * as dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();
import config from "config";
import { EmployeeStatus, User } from "../entities/user.entity";
import { signJwt } from "../utils/jwt";
import { DataSource, Repository } from "typeorm";
import { AppDataSource } from "../utils/data-source";
import { Address } from "../entities/address.entity";
import { Role } from "../entities/role.entity";
import AppError from "../utils/appError";
import { RoleService } from "./role.service";
import { UserRepository } from "../repositories/user.repository";
import { RoleRepository } from "../repositories/role.repository";
import { TYPES } from "../types";
import { AddressService } from "./address.service";
import { AddressRepository } from "../repositories/address.repository";

interface Tokens {
  access_token: string;
  refresh_token: string;
}

@injectable()
export class UserService {
  private userRepository: UserRepository;
  private roleRepository: RoleRepository;
  private addressRepository: AddressRepository;

  constructor(
    @inject(TYPES.DataSource) private dataSource: DataSource,
    @inject(TYPES.AddressService) private addressService: AddressService,
    @inject(TYPES.RoleService) private roleService: RoleService
  ) {
    this.userRepository = this.dataSource.getRepository(User) as UserRepository;
    this.roleRepository = this.dataSource.getRepository(Role) as RoleRepository;
    this.addressRepository = this.dataSource.getRepository(
      Address
    ) as AddressRepository;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find({ relations: ["address", "role"] });
  }

  async findUserById(id: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
      relations: ["address", "role"],
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async createUser(input: any): Promise<User> {
    // Generate employeeId
    const employeeId = await this.generateEmployeeId(input.roleId);

    // Find and validate the role
    const role = await this.roleService.findOneRole(input.role);
    if (!role) {
      throw new Error("Role not found");
    }

    // Generate random password
    const randomPassword = this.generateRandomPassword();
    console.log(randomPassword);
    // Create new user entity and set fields
    const user = new User();
    Object.assign(user, input);
    user.employeeCode = employeeId; // Assign employeeId to user
    // await user.setPassword(randomPassword); // Set the generated password
    user.password = randomPassword;

    // If address is provided in the input, create and link it
    if (input.address) {
      const address = new Address();
      Object.assign(address, input.address);
      user.address = address;
    }
    user.role = role;

    return this.userRepository.save(user); // Save user in the database
  }

  async updateUser(id: string, userData: any): Promise<User> {
    const {
      street,
      city,
      state,
      postalCode,
      country,
      roleId,
      firstName,
      middleName,
      lastName,
      username,
      phoneNumber,
      email,
      companyEmail,
      designation,
      employeeCode,
      joiningDate,
      relocationDate,
      relocationPlace,
      status,
      employeeStatus,
      recommendedBy,
      cugNo,
      reportingAuthorityAdministrative,
      reportingAuthorityFunctional,
      ...rest
    } = userData;

    const user = await this.findUserById(id);
    if (!user) {
      throw new AppError(404, "User not found");
    }

    const role = await this.roleService.findRoleById(roleId);
    if (!role) {
      throw new AppError(404, "Role not found");
    }

    // Handle address update or creation
    if (street || city || state || postalCode || country) {
      let address = user.address;

      if (!address) {
        // Create a new address if it does not exist
        address = await this.addressService.create({
          street,
          city,
          state,
          postalCode,
          country,
        });
      } else {
        // Update existing address with the provided fields
        const updatedAddressData = {
          street: street ?? address.street,
          city: city ?? address.city,
          state: state ?? address.state,
          postalCode: postalCode ?? address.postalCode,
          country: country ?? address.country,
        };

        address = await this.addressService.update(
          address.id,
          updatedAddressData
        );
        if (!address) {
          throw new AppError(400, "Address update failed");
        }
      }

      user.address = address;
    }

    user.role = role;
    user.employeeCode = this.updateEmployeeIdRoleCode(
      user.employeeCode,
      role.roleCode
    );

    // Update other fields
    user.firstName = firstName ?? user.firstName;
    user.middleName = middleName ?? user.middleName;
    user.lastName = lastName ?? user.lastName;
    user.username = username ?? user.username;
    user.phoneNumber = phoneNumber ?? user.phoneNumber;
    user.email = email ?? user.email;
    user.companyEmail = companyEmail ?? user.companyEmail;
    user.designation = designation ?? user.designation;
    user.joiningDate = joiningDate ?? user.joiningDate;
    user.relocationDate = relocationDate ?? user.relocationDate;
    user.relocationPlace = relocationPlace ?? user.relocationPlace;
    user.status = status ?? user.status;
    user.employeeStatus = employeeStatus ?? user.employeeStatus;
    user.recommendedBy = recommendedBy ?? user.recommendedBy;
    user.cugNo = cugNo ?? user.cugNo;
    user.reportingAuthorityAdministrative =
      reportingAuthorityAdministrative ?? user.reportingAuthorityAdministrative;
    user.reportingAuthorityFunctional =
      reportingAuthorityFunctional ?? user.reportingAuthorityFunctional;

    // Assign any additional fields to the user
    Object.assign(user, rest);

    return this.userRepository.save(user);
  }

  // async updateUser(id: string, userData: any): Promise<User> {
  //   const { street, city, state, postalCode, country, ...rest } = userData;

  //   const user = await this.findUserById(id);
  //   if (!user) {
  //     throw new AppError(404, "User not found");
  //   }

  //   const role = await this.roleService.findRoleById(rest.roleId);
  //   if (!role) {
  //     throw new AppError(404, "Role not found");
  //   }

  //   // Handle address update or creation
  //   if (street || city || state || postalCode || country) {
  //     let address = user.address;

  //     if (!address) {
  //       // Create a new address if it does not exist
  //       address = await this.addressService.create({
  //         street,
  //         city,
  //         state,
  //         postalCode,
  //         country,
  //       });
  //     } else {
  //       // Update existing address with the provided fields
  //       const updatedAddressData = {
  //         street: street ?? address.street,
  //         city: city ?? address.city,
  //         state: state ?? address.state,
  //         postalCode: postalCode ?? address.postalCode,
  //         country: country ?? address.country,
  //       };

  //       address = await this.addressService.update(
  //         address.id,
  //         updatedAddressData
  //       );
  //       if (!address) {
  //         throw new AppError(400, "Address update failed");
  //       }
  //     }

  //     user.address = address;
  //   }

  //   user.role = role;
  //   user.employeeCode = this.updateEmployeeIdRoleCode(
  //     user.employeeCode,
  //     role.roleCode
  //   );

  //   // Assign remaining fields to user
  //   Object.assign(user, rest);

  //   return this.userRepository.save(user);
  // }

  // async upadateEmployeeState(id: string): Promise<User> {
  //   const user = await this.findUserById(id);
  //   if (!user) {
  //     throw new AppError(404, "User not found");
  //   }
  //   if (user.employeeStatus === EmployeeStatus.INACTIVE) {
  //     user.employeeStatus = EmployeeStatus.ACTIVE;
  //   } else {
  //     user.employeeStatus = EmployeeStatus.INACTIVE;
  //   }
  //   return this.userRepository.save(user);
  // }

  async deleteUser(id: string): Promise<boolean> {
    const result = await this.userRepository.softDelete(id);
    return result.affected !== 0; // Returns true if a user was deleted
  }

  async findUserByIdentifier(uid: string): Promise<User | null> {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(uid);
    const isPhoneNumber = /^[+\d][\d\s]+$/.test(uid);
    const isUsername = !isEmail && !isPhoneNumber;

    let user: User | null = null;

    if (isUsername) {
      user = await this.userRepository.findOne({
        where: { username: uid },
        relations: ["role"],
      });
    } else if (isEmail) {
      user = await this.userRepository.findOne({
        where: { companyEmail: uid },
        relations: ["role"],
      });
    } else if (isPhoneNumber) {
      user = await this.userRepository.findOne({
        where: { phoneNumber: uid },
        relations: ["role"],
      });
    }

    return user;
  }

  async signTokens(user: User): Promise<Tokens> {
    // 1. Create Access and Refresh tokens
    const access_token = signJwt({ sub: user.id }, "accessTokenPrivateKey", {
      expiresIn: `${config.get<number>("accessTokenExpiresIn")}m`,
    });

    const refresh_token = signJwt({ sub: user.id }, "refreshTokenPrivateKey", {
      expiresIn: `${config.get<number>("refreshTokenExpiresIn")}m`,
    });

    return { access_token, refresh_token };
  }

  async getTotalNumberOfUsers(): Promise<number> {
    return this.userRepository.count();
  }

  async generateEmployeeId(roleId: string): Promise<string> {
    try {
      const role = await this.roleRepository.findOneBy({ id: roleId });

      if (!role) {
        throw new Error("Role not found");
      }

      const companyCode = "00";
      let roleCode = role.roleCode;

      // Get count of existing users
      const count = await this.getTotalNumberOfUsers();

      // Serial number is count + 1
      const serialNumber = count + 1;
      const formattedSerialNumber = serialNumber.toString().padStart(4, "0");
      return `PF${companyCode}${roleCode}${formattedSerialNumber}`;
    } catch (error) {
      console.error("Error generating employee ID:", error);
      throw error;
    }
  }

  updateEmployeeIdRoleCode(employeeId: string, newRoleCode: string): string {
    const companyCode = "00";
    // Assume the employeeId format is PF00XYYYY, where X is the roleCode and YYYY is the serial number
    const serialNumber = employeeId.slice(-4); // Extract the last 4 characters as the serial number
    return `PF${companyCode}${newRoleCode}${serialNumber}`;
  }

  private generateRandomPassword(length: number = 8): string {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }
}

//madhuri code

// import { inject, injectable } from "inversify";
// import * as dotenv from "dotenv";

// dotenv.config();
// import config from "config";
// import { UpdateUserInput } from "../schemas/user.schema";
// import { User } from "../entities/user.entity";
// import { signJwt } from "../utils/jwt";

// import { DataSource, Repository } from "typeorm";
// import { AppDataSource } from "../utils/data-source";
// import { Address } from "../entities/address.entity";
// import { Role } from "../entities/role.entity";
// import AppError from "../utils/appError";
// import { RoleService } from "./role.service";
// import { UserRepository } from "../repositories/user.repository";
// import { RoleRepository } from "../repositories/role.repository";
// import { TYPES } from "../types";
// import { AddressService } from "./address.service";
// import { AddressRepository } from "../repositories/address.repository";
// interface Tokens {
//   access_token: string;
//   refresh_token: string;
// }
// @injectable()
// export class UserService {
//   private userRepository: UserRepository;
//   private roleRepository: RoleRepository;

//   private addressRepository: AddressRepository;

//   constructor(
//     @inject(TYPES.DataSource) private dataSource: DataSource,
//     @inject(TYPES.AddressService) private addressService: AddressService,
//     @inject(TYPES.RoleService) private roleService: RoleService
//   ) {
//     this.userRepository = this.dataSource.getRepository(User) as UserRepository;
//     this.roleRepository = this.dataSource.getRepository(Role) as RoleRepository;
//     this.addressRepository = this.dataSource.getRepository(
//       Address
//     ) as AddressRepository;
//   }

//   async getAllUsers(): Promise<User[]> {
//     return this.userRepository.find({ relations: ["address", "role"] });
//   }

//   async findUserById(id: string): Promise<User | null> {
//     return this.userRepository.findOne({
//       where: { id },
//       relations: ["address", "role"],
//     });
//   }

//   async findUserByEmail(email: string): Promise<User | null> {
//     return this.userRepository.findOne({
//       where: { email },
//     });
//   }
//   async createUser(input: any): Promise<User> {
//     // Generate employeeId
//     const employeeId = await this.generateEmployeeId(input.roleId);
//     //Find and validate the role
//     const role = await this.roleService.findOneRole(input.roleId);
//     if (!role) {
//       throw new Error("Role not found");
//     }
//     const user = new User();
//     Object.assign(user, input);
//     user.employeeId = employeeId; // Assign employeeId to user
//     // If address is provided in the input, create and link it
//     if (input.address) {
//       const address = new Address();
//       Object.assign(address, input.address);
//       user.address = address;
//       user.role = role;
//     }
//     return this.userRepository.save(user); // Save user in the database
//   }

//   // async updateUser(id: string, input: UpdateUserInput): Promise<User> {
//   //   console.log("update id is ", id);
//   //   const user = await this.userRepository.findOne({ where: { id } });
//   //   if (!user) {
//   //     throw new Error("User not found");
//   //   }
//   //   Object.assign(user, input);
//   //   return this.userRepository.save(user); // Save updated user
//   // }
//   async deleteUser(id: string): Promise<boolean> {
//     const result = await this.userRepository.softDelete(id);
//     return result.affected !== 0; // Returns true if a user was deleted
//   }
//   // async findUser(query: Object): Promise<User | null> {
//   //   return this.userRepository.findOneBy(query);
//   // }

//   // async findUser(query: { username?: string; email?: string; phoneNumber?: string }): Promise<User | null> {
//   //   return this.userRepository.findOne({
//   //     where: query,
//   //     relations: ['role'] // Include the relations you need
//   //   });
//   // }

//   async updateUser(id: string, userData: any): Promise<User> {
//     const { street, city, state, postalCode, country, ...rest } = userData;

//     const user = await this.findUserById(id);
//     if (!user) {
//       throw new AppError(404, "User not found");
//     }

//     const role = await this.roleService.findRoleById(rest.roleId);
//     if (!role) {
//       throw new AppError(404, "Role not found");
//     }

//     // Handle address update or creation
//     if (street || city || state || postalCode || country) {
//       let address = user.address;

//       if (!address) {
//         // Create a new address if it does not exist
//         address = await this.addressService.create({
//           street,
//           city,
//           state,
//           postalCode,
//           country,
//         });
//       } else {
//         // Update existing address with the provided fields
//         const updatedAddressData = {
//           street: street ?? address.street,
//           city: city ?? address.city,
//           state: state ?? address.state,
//           postalCode: postalCode ?? address.postalCode,
//           country: country ?? address.country,
//         };

//         address = await this.addressService.update(
//           address.id,
//           updatedAddressData
//         );
//         if (!address) {
//           throw new AppError(400, "Address update failed");
//         }
//       }

//       user.address = address;
//     }

//     user.role = role;
//     user.employeeId = this.updateEmployeeIdRoleCode(
//       user.employeeId,
//       role.roleCode
//     );

//     // Assign remaining fields to user
//     Object.assign(user, rest);

//     return this.userRepository.save(user);
//   }

//   async findUserByIdentifier(uid: string): Promise<User | null> {
//     const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(uid);
//     const isPhoneNumber = /^[+\d][\d\s]+$/.test(uid);
//     const isUsername = !isEmail && !isPhoneNumber;

//     let user: User | null = null;

//     if (isUsername) {
//       user = await this.userRepository.findOne({
//         where: { username: uid },
//         relations: ["role"],
//       });
//     } else if (isEmail) {
//       user = await this.userRepository.findOne({
//         where: { email: uid },
//         relations: ["role"],
//       });
//     } else if (isPhoneNumber) {
//       user = await this.userRepository.findOne({
//         where: { phoneNumber: uid },
//         relations: ["role"],
//       });
//     }

//     return user;
//   }

//   async signTokens(user: User): Promise<Tokens> {
//     // 1. Create Access and Refresh tokens
//     const access_token = signJwt({ sub: user.id }, "accessTokenPrivateKey", {
//       expiresIn: `${config.get<number>("accessTokenExpiresIn")}m`,
//     });

//     const refresh_token = signJwt({ sub: user.id }, "refreshTokenPrivateKey", {
//       expiresIn: `${config.get<number>("refreshTokenExpiresIn")}m`,
//     });

//     return { access_token, refresh_token };
//   }

//   async getTotalNumberOfUsers(): Promise<number> {
//     return this.userRepository.count();
//   }
//   async generateEmployeeId(roleId: string): Promise<string> {
//     try {
//       const role = await this.roleRepository.findOneBy({ id: roleId });

//       if (!role) {
//         throw new Error("Role not found");
//       }
//       const companyCode = "00";
//       let roleCode = role.roleCode;

//       // Get count of existing users
//       const count = await this.getTotalNumberOfUsers();

//       // Serial number is count + 1
//       const serialNumber = count + 1;
//       const formattedSerialNumber = serialNumber.toString().padStart(4, "0");
//       return `PF${companyCode}${roleCode}${formattedSerialNumber}`;
//     } catch (error) {
//       console.error("Error generating employee ID:", error);
//       throw error;
//     }
//   }

//   updateEmployeeIdRoleCode(employeeId: string, newRoleCode: string): string {
//     const companyCode = "00";
//     // Assume the employeeId format is PF00XYYYY, where X is the roleCode and YYYY is the serial number
//     const serialNumber = employeeId.slice(-3); // Extract the last 4 characters as the serial number
//     return `PF${companyCode}${newRoleCode}${serialNumber}`;
//   }
// }
