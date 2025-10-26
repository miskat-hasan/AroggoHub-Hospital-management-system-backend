import jwt, { SignOptions } from "jsonwebtoken";
import config from "../config/env"; // adjust path as needed

export const signJwt = (payload: object): string => {
  const secret = config.jwt_secret;
  if (!secret) throw new Error("JWT secret not configured");

  // Type-safe cast for expiresIn
  const options: SignOptions = {
    expiresIn: config.jwt_expires_in as unknown as jwt.StringValue,
  };

  return jwt.sign(payload, secret, options);
};

export const verifyJwt = <T>(token: string): T | null => {
  try {
    return jwt.verify(token, config.jwt_secret as string) as T;
  } catch {
    return null;
  }
};
