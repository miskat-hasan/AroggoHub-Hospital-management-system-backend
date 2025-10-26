import { Request, Response } from "express";
import { registerService } from "./auth.service";

import { baseRegisterSchema } from "./auth.validation";
import { UserRole } from "./user.interface";
import { doctorRegisterSchema } from "./doctor/doctor.validation";
import { patientRegisterSchema } from "./patient/patient.validation";
import { signJwt } from "../../utils/jwt";


const register = async (req: Request, res: Response) => {
  try {
    // Base validation
    const baseData = baseRegisterSchema.parse(req.body);

    // Role-specific validation
    if (baseData.role === UserRole.Doctor) doctorRegisterSchema.parse(req.body);
    if (baseData.role === UserRole.Patient) patientRegisterSchema.parse(req.body);

    const user = await registerService(req.body);
    const token = signJwt({ userId: user._id, role: user.role });
    res.status(201).json({ success: true, user, token });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const AuthController = {
  register,
};