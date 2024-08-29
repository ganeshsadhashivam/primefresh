// middlewares/authMiddleware.ts

import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";
import { verifyJwt } from "../utils/jwt";
import { inject, injectable } from "inversify";
import { UserService } from "../services/user.service";

@injectable()
export class AuthMiddleware {
  constructor(@inject("UserService") private userService: UserService) {}

  public deserializeUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    let access_token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      access_token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.access_token) {
      access_token = req.cookies.access_token;
    }

    if (!access_token) {
      return next(new AppError(401, "You are not logged in"));
    }

    // Validate the access token
    const decoded = verifyJwt<{ sub: string }>(
      access_token,
      "accessTokenPublicKey"
    );

    if (!decoded) {
      return next(new AppError(401, `Invalid token or user doesn't exist`));
    }

    // Check if the user still exists
    const user = await this.userService.findUserById(decoded.sub);

    if (!user) {
      return next(new AppError(401, `Invalid token or session has expired`));
    }

    // Add user to res.locals
    res.locals.user = user;

    next();
  };

  public requireUser = (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;

    if (!user) {
      return next(
        new AppError(400, `Session has expired or user doesn't exist`)
      );
    }

    next();
  };

  public roleAuthorization = (...roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      const user = res.locals.user;

      if (!user || !roles.includes(user.role)) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      next();
    };
  };
}
