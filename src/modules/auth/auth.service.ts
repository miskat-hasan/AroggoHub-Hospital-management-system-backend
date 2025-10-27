import bcrypt from "bcrypt";
import { UserModel } from "./user.model";
import { UserRole } from "./user.interface";
import { DoctorModel } from "./doctor/doctor.model";
import { PatientModel } from "./patient/patient.model";





export const registerService = async (payload: any) => {
  const { name, email, password, role, ...rest } = payload;

  const existing = await UserModel.findOne({ email });
  if (existing) throw new Error("Email already registered");

  const hashed = await bcrypt.hash(password, 10);
  const user = await UserModel.create({ name, email, password: hashed, role });

  switch (role) {
    case UserRole.Doctor:
      await DoctorModel.create({ user_id: user._id, ...rest });
      break;
    case UserRole.Patient:
      await PatientModel.create({ user_id: user._id, ...rest });
      break;
    default:
      break;
  }

  return user;
};
