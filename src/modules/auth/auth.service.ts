import type { NextFunction, Request } from "express";

import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import { sendMail } from "../../utils/sendMail.js";

import { UserModel } from "./user.model.js";

import { generateToken } from "../../utils/generateToken.js";
import { VerifyCode } from "./verificationCode.model.js";
import { IUser } from "../../types/interface.js";

const USendCode = async (email: string) => {
  const user = await UserModel.findOne({ email });
  if (user) {
    throw createHttpError(400, "User already exist");
  }

  const verificationCode = Math.floor(100000 + Math.random() * 900000);

  const result = await VerifyCode.create({ email, verificationCode });
  if (!result) {
    throw createHttpError(400, "Failed to create verification code");
  }
  console.log(result);

  await sendMail(
    email,
    "Your AroggoHub verification code",
    `${verificationCode}`
  );

  return result;
};

const UVerifyCode = async (req: Request) => {
  const result = await VerifyCode.findOne({
    email: req.body.email,
    verificationCode: req.body.verificationCode,
  });

  if (!result) {
    throw createHttpError(400, "Verification failed");
  }

  result.verified = true;

  await result.save();

  return result;
};

const ULogin = async (email: string, password: string, next: NextFunction) => {
  const user: IUser | null = await UserModel.findOne({ email });
  if (!user) {
    throw createHttpError(404, "User Not Found");
  }

  if (user.isBlocked || user.isDeleted) {
    throw createHttpError(401, "Your'e not allowed to login");
  }
  if (!user.password) {
    throw createHttpError(404, "No pass available");
  }
  const isPassMatched: boolean = await bcrypt.compare(
    password as string,
    user.password
  );

  if (!isPassMatched) {
    throw createHttpError(400, "Password didn't matched");
  }

  const accessToken = generateToken(
    {
      id: user._id as string,
      role: user.role,
    },
    "1h"
  );

  const refreshToken = generateToken(
    { id: user._id as string, role: user.role },
    "7d"
  );

  user.refreshToken = refreshToken;

  await user.save();

  const { password: _, ...userData } = user.toObject();
  return {
    user: userData,
    accessToken,
    refreshToken,
  };
};

const UProfile = async (userId: string) => {
  return await UserModel.findById(userId).select("-password");
};
const UUpdateUser = async (id: string, payload: IUser) => {
  return await UserModel.findByIdAndUpdate(id, payload, { new: true });
};
const UDelete = async (id: string) => {
  return await UserModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
};

const UChangePassword = async (req: Request) => {
  const userId = req.user?._id;
  if (!userId) {
    throw createHttpError(401, "Unauthorized");
  }
  const { oldPass, newPass } = req.body;

  const user = await UserModel.findById(userId);

  const isPassMatched = await bcrypt.compare(oldPass, user?.password as string);
  if (!isPassMatched) {
    throw createHttpError(400, "Password didn't matched");
  }

  const hashedPass = await bcrypt.hash(newPass, 10);

  return await UserModel.findByIdAndUpdate(
    userId,
    { password: hashedPass, isPasswordChanged: true },
    { new: true }
  );
};

const USendForgetPassCode = async (email: string) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw createHttpError(404, "User not found");
  }

  await VerifyCode.deleteMany({ email });

  const code = Math.floor(100000 + Math.random() * 900000);

  const verifyCode = await VerifyCode.create({ email, verificationCode: code });
  if (!verifyCode) {
    throw createHttpError(400, "Failed to generate verification code");
  }

  await sendMail(email, "Your password reset code", `${code}`);

  return {
    success: true,
    message: "Verification code sent successfully",
  };
};

const UForgetPassword = async (
  email: string,
  verificationCode: number,
  newPass: string
) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw createHttpError(404, "User not found");
  }

  const codeDoc = await VerifyCode.findOne({ email, verificationCode });
  if (!codeDoc) {
    throw createHttpError(400, "Invalid or expired verification code");
  }

  const hashedPass = await bcrypt.hash(newPass, 10);
  user.password = hashedPass;

  await user.save();
  await VerifyCode.deleteOne({ email, verificationCode });

  return {
    success: true,
    message: "Password reset successfully",
  };
};

export const SUser = {
  USendCode,
  ULogin,
  UProfile,
  UUpdateUser,
  UDelete,
  UVerifyCode,
  UChangePassword,
  UForgetPassword,
  USendForgetPassCode,
};
