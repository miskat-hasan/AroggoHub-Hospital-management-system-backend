import AppError from "../../../helper/AppError";
import bcrypt from "bcrypt";
import { HttpStatus } from "http-status-ts";
import { UserModel } from "../user.model";
import { VerifyCode } from "../verificationCode.model";
import { PatientModel } from "./patient.model";

interface Request {
  body: {
    name: string;
    email: string;
    password: string;
    verificationCode: number;
  };
}

const createPatientAccount = async (req: Request) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return new AppError(
        "Please provide email, password and name",
        HttpStatus.BAD_REQUEST
      );
    }

    const codeDoc = await VerifyCode.findOne({ email, verificationCode: 1 });
    if (!codeDoc) {
      throw new AppError("Invalid or expired verification code", 400);
    }

    const user = await UserModel.findOne({ email });
    if (user) {
      throw new AppError("User already exists", HttpStatus.BAD_REQUEST);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = await PatientModel.create({
      name,
      email,
      password: hashedPass,
      role: "Patient",
    });

    if (!newUser) {
      return new AppError("Failed to create user", 400);
    }
    await VerifyCode.deleteMany({ email });

    return {
      success: true,
      message: "User created successfully",
      user: newUser,
    };
  } catch (error: any) {
    throw new AppError(error.message, 400);
  }
};

const updatePatientAccount = async (req: Request) => {};
const deletePatientAccount = async (req: Request) => {};
const getPatientAccount = async (req: Request) => {};

export const PatientService = {
  createPatientAccount,
  updatePatientAccount,
  deletePatientAccount,
  getPatientAccount,
};
