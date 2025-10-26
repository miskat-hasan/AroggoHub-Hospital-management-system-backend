import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "http-status-ts";
import AppError from "../helper/AppError";
import jwt, { JwtPayload } from 'jsonwebtoken'
import env from "../config/env";
import { UserRole } from "../modules/auth/user.interface";

export const auth = (...allowedRoles: UserRole[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies?.token;

        if (!token) {
            return next(
                new AppError("You are not Authorized!! Please login First", HttpStatus.UNAUTHORIZED)
            )
        }

        try {
            const decode = jwt.verify(token, env.jwt_secret) as JwtPayload & {
                id: string;
                role: UserRole
            }

            (req as any).user = decode;

            //check role
            if (!allowedRoles.includes(decode.role)) {
                return next(
                    new AppError("Forbidden: You do not have permission to access this resource.", HttpStatus.FORBIDDEN)
                );
            }

            next()


        } catch (error) {
            return next(
                new AppError("Invalid or expired token.", HttpStatus.UNAUTHORIZED)
            );
        }
    }
}