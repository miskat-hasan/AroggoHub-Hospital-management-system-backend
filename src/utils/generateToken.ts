import jwt, { type SignOptions } from "jsonwebtoken";
import env from "../config/env";

interface JwtPayload {
  id: string;
  role:
    | "LabStaff"
    | "Nurse"
    | "Patient"
    | "Doctor"
    | "Receptionist"
    | "Admin"
    | "SuperAdmin";
}

export const generateToken = (
  payload: JwtPayload,
  expiresIn: SignOptions["expiresIn"] = "1h"
): string => {
  const secret = env.jwt_secret as string;
  const options: SignOptions = { expiresIn };

  return jwt.sign(payload, secret, options);
};
