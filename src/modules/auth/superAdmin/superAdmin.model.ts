import { Schema } from "mongoose";
import { ISuperAdmin } from "../../../types/interface";
import { UserModel } from "../user.model";

const SuperAdminSchema = new Schema<ISuperAdmin>(
  {
    designation: String,
  },
  { timestamps: true }
);

export const SuperAdmin = UserModel.discriminator(
  "SuperAdmin",
  SuperAdminSchema
);
