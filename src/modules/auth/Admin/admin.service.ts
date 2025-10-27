import { UserModel } from "../user.model";
import AppError from "../../../helper/AppError";
import { HttpStatus } from "http-status-ts";
import bcrypt from "bcrypt";
import { IUser } from "../../../types/interface";
import { ReceptionistModel } from "../receptionist/receptionist.model";
import { NurseModel } from "../nurse/nurse.model";
import { Admin } from "./admin.model";
import { DoctorModel } from "../doctor/doctor.model";

interface Request {
  body: {
    name: string;
    email: string;
    password: string;
    role: string;
    department_id: string;
  };
}

const createStuffAcc = async (req: Request) => {
  const { name, email, password, role, department_id } = req.body;

  if (!name || !email || !password || !role) {
    throw new AppError(
      "Please provide name, email and password",
      HttpStatus.BAD_REQUEST
    );
  }

  const user = await UserModel.findOne({ email });
  if (user) {
    throw new AppError("User already exists", HttpStatus.BAD_REQUEST);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);

  let newUser: IUser | null = null;

  switch (role) {
    case "Doctor":
      return (newUser = await DoctorModel.create({
        name,
        email,
        password: hashedPass,
        role,
        department_id,
      }));
    case "Receptionist":
      return (newUser = await ReceptionistModel.create({
        name,
        email,
        password: hashedPass,
        role,
        assigned_department: department_id,
      }));
    case "Nurse":
      return (newUser = await NurseModel.create({
        name,
        email,
        password: hashedPass,
        role,
        assigned_department: department_id,
      }));
    case "LabStaff":
      return (newUser = await NurseModel.create({
        name,
        email,
        password: hashedPass,
        role,
        department_id,
      }));
  }

  return {
    success: true,
    message: "Admin account created successfully",
    stuffAcc: newUser,
  };
};

export default { createStuffAcc };
