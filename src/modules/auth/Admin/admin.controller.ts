import type { Request, Response, NextFunction } from "express";
import { SuperAdminService } from "../superAdmin/superAdmin.service";
import { HttpStatus } from "http-status-ts";
import AppError from "../../../helper/AppError";

export const createStuffAcc = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await SuperAdminService.createAdminAcc(req as Request);
    res.status(HttpStatus.OK).json(result);
  } catch (error: any) {
    next(new AppError(error.message, 400));
  }
};
