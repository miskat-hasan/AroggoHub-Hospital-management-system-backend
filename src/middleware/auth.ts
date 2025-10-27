import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import type { JwtPayload } from "jsonwebtoken";
import { IUser } from "../types/interface";
import { UserModel } from "../modules/auth/user.model";
import env from "../config/env";
import jwt from "jsonwebtoken";
import AppError from "../helper/AppError";
import { HttpStatus } from "http-status-ts";

export const checkRole =
  (...allowedRole: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return new AppError(
        "Unauthorized: No user found",
        HttpStatus.UNAUTHORIZED
      );
    }

    if (!allowedRole.includes(req.user.role)) {
      return new AppError(
        "Forbidden: You don't have permission to access this resource",
        HttpStatus.FORBIDDEN
      );
    }
    next();
  };

export const User = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.cookies.token;
    const refreshToken = req.cookies.refreshToken;

    if (!token) {
      if (!refreshToken) {
        return new AppError(
          "Unauthorized: No token found",
          HttpStatus.UNAUTHORIZED
        );
      }
      const refreshDecoded = jwt.verify(
        refreshToken,
        env.jwt_secret as string
      ) as JwtPayload;

      const newAccessToken = jwt.sign(
        { id: refreshDecoded.id, email: refreshDecoded.role },
        env.jwt_secret as string,
        { expiresIn: "1h" }
      );

      res.cookie("token", newAccessToken, {
        httpOnly: true,
        secure: env.node_env === "production",
        sameSite: env.node_env === "production" ? "none" : "lax",
        maxAge: 60 * 60 * 1000,
      });
      token = newAccessToken;
    }

    const decoded = jwt.verify(token, env.jwt_secret as string) as JwtPayload;

    if (!decoded) {
      return new AppError(
        "Unauthorized: No token found",
        HttpStatus.UNAUTHORIZED
      );
    }

    let user: IUser | null = await UserModel.findById(decoded.id);

    if (!user) {
      return new AppError(
        "Unauthorized: No user found",
        HttpStatus.UNAUTHORIZED
      );
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
