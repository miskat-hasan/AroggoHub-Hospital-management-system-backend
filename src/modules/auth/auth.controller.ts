import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import dotenv from "dotenv";
import { SUser } from "./auth.service.js";
import env from "../../config/env.js";
import { IUser } from "../../types/interface.js";

dotenv.config();

export const sendVerificationCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await SUser.USendCode(req.body.email as string);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const verifyCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resp = await SUser.UVerifyCode(req);
    if (!resp) {
      return next(createHttpError(400, "Code didn't match, try again"));
    }

    res.status(200).json({
      success: true,
      message: "Code verified successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body as { email: string; password: string };

    const result = await SUser.ULogin(email, password, next);
    if (!result) {
      return next(createHttpError(400, "Login failed"));
    }

    res
      .status(200)
      .cookie("token", result.accessToken, {
        httpOnly: true,
        secure: env.node_env === "production",
        sameSite: env.node_env === "production" ? "none" : "lax",
        maxAge: 60 * 60 * 1000,
      })
      .cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: env.node_env === "production",
        sameSite: env.node_env === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: "Login successful",
        user: result.user,
      });
  } catch (error) {
    next(error);
  }
};

export const profile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user) return next(createHttpError(401, "Unauthorized"));

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user?._id) {
      return next(createHttpError(401, "Unauthorized"));
    }

    const updatedUser = await SUser.UUpdateUser(
      req.user._id as string,
      req.body as IUser
    );
    if (!updatedUser) {
      return next(createHttpError(400, "User update failed"));
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user?._id) {
      return next(createHttpError(401, "Unauthorized"));
    }

    const deletedUser = await SUser.UDelete(req.user._id as string);
    if (!deletedUser) {
      return next(createHttpError(400, "User deletion failed"));
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await SUser.UChangePassword(req);
    res.status(200).json({
      success: true,
      message: "Password changed successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const sendForgetPassCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body as { email: string };
    const result = await SUser.USendForgetPassCode(email);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const forgetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, verificationCode, newPass } = req.body as {
      email: string;
      verificationCode: number;
      newPass: string;
    };
    const result = await SUser.UForgetPassword(
      email,
      verificationCode,
      newPass
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: env.node_env === "production",
      sameSite: env.node_env === "production" ? "none" : "lax",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: env.node_env === "production",
      sameSite: env.node_env === "production" ? "none" : "lax",
    });

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    next(error);
  }
};
