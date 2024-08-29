import { NextFunction, Request, Response } from "express";
import config from "config";
import { CreateUserInput } from "../schemas/user.schema";
import { UserService } from "../services/user.service";
import AppError from "../utils/appError";
import { signJwt, verifyJwt } from "../utils/jwt";
import { EmployeeStatus, User } from "../entities/user.entity";
import { inject } from "inversify";
import { controller, httpPost } from "inversify-express-utils";
import { TYPES } from "../types";
import { LoginUserInput } from "../schemas/auth.schema";

@controller("/auth")
export class AuthController {
  constructor(@inject(TYPES.UserService) private userService: UserService) {}

  // @httpPost("/signup")
  // public async loginUserHandler(
  //   req: Request<{}, {}, LoginUserInput>,
  //   res: Response,
  //   next: NextFunction
  // ) {
  //   try {
  //     const { uid, password } = req.body;
  //     const trimmedPassword = password.trim();

  //     let user = await this.userService.findUserByIdentifier(uid);

  //     if (!user) {
  //       return next(new AppError(400, "User not found"));
  //     }

  //     if (!user.role) {
  //       return next(new AppError(400, "Role not found"));
  //     }

  //     const role = user.role.name;

  //     const isPasswordMatch = await User.comparePasswords(trimmedPassword, user.password);
  //     if (!isPasswordMatch) {
  //       return next(new AppError(400, "Password is incorrect"));
  //     }

  //     const { access_token, refresh_token } = await this.userService.signTokens(user);

  //     res.status(200).json({
  //       status: "success",
  //       access_token,
  //       refresh_token,
  //       role
  //     });
  //   } catch (err: any) {
  //     next(err);
  //   }
  // }

  @httpPost("/refresh-token")
  public async refreshAccessTokenHandler(
    req: Request<{}, {}, { refresh_token: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { refresh_token } = req.body;

      if (!refresh_token) {
        return next(new AppError(403, "Refresh token is required"));
      }

      const decoded = verifyJwt<{ sub: string }>(
        refresh_token,
        "refreshTokenPublicKey"
      );
      if (!decoded) {
        return next(new AppError(403, "Invalid refresh token"));
      }

      const user = await this.userService.findUserById(decoded.sub);
      if (!user) {
        return next(new AppError(403, "User not found"));
      }

      const access_token = signJwt({ sub: user.id }, "accessTokenPrivateKey", {
        expiresIn: `${config.get<number>("accessTokenExpiresIn")}m`,
      });

      res.status(200).json({
        status: "success",
        access_token,
      });
    } catch (err: any) {
      next(err);
    }
  }

  @httpPost("/signup")
  public async loginUserHandler(
    req: Request<{}, {}, LoginUserInput>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { uid, password } = req.body;
      const trimmedPassword = password.trim();

      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(uid);
      const isPhoneNumber = /^[+\d][\d\s]+$/.test(uid);
      const isUsername = !isEmail && !isPhoneNumber;

      let user: User | null = null;
      let formatErrorMessage = "";
      let passwordErrorMessage = "";

      if (isEmail) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(uid)) {
          return next(new AppError(400, "Email format is incorrect"));
        }

        user = await this.userService.findUserByIdentifier(uid);
      } else if (isPhoneNumber) {
        if (!/^[+\d][\d\s]+$/.test(uid)) {
          return next(new AppError(400, "Phone number format is incorrect"));
        }

        user = await this.userService.findUserByIdentifier(uid);
      } else if (isUsername) {
        if (uid.trim() === "") {
          return next(new AppError(400, "Username format is incorrect"));
        }

        user = await this.userService.findUserByIdentifier(uid);
      }

      if (!user) {
        return next(new AppError(400, "User not found"));
      }

      // Check employeeStatus
      if (user.employeeStatus === EmployeeStatus.INACTIVE) {
        return next(new AppError(403, "Not Authorized to SignIn"));
      }

      const isPasswordMatch = await User.comparePasswords(
        trimmedPassword,
        user.password
      );

      if (!password) {
        console.log("passwd incorrect");
        return next(new AppError(400, "Password is incorrect"));
      }

      // Password format check (if necessary)
      if (
        isPasswordMatch &&
        !/^[A-Za-z0-9!@#$%^&*()_+]{8,}$/.test(trimmedPassword)
      ) {
        return next(new AppError(400, "Password format is incorrect"));
      }

      if (!user.role) {
        return next(new AppError(400, "Role not found"));
      }

      const { access_token, refresh_token } = await this.userService.signTokens(
        user
      );

      res.status(200).json({
        status: "success",
        access_token,
        refresh_token,
        role: user.role.name,
      });
    } catch (err: any) {
      next(err);
    }
  }
}
