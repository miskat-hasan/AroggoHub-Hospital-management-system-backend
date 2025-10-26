import { Document } from "mongoose";

export enum UserRole {
  Admin = "Admin",
  Receptionist = "Receptionist",
  Doctor = "Doctor",
  Patient = "Patient",
  Nurse = "Nurse",
  LabStaff = "LabStaff"
}

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  phone?: string;
  gender?: string;
  address?: string;
  profile_picture?: string;
  hospital_id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
