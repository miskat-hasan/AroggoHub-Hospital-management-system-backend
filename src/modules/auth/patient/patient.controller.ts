import type { Request, Response, NextFunction } from "express";
import AppError from "../../../helper/AppError";
import { HttpStatus } from "http-status-ts";
import { PatientService } from "./patient.service";

export const createPatient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await PatientService.createPatientAccount(req.body);
    res.status(HttpStatus.OK).json(result);
  } catch (error) {
    next(error);
  }
};
