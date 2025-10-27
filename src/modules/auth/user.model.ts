import { Schema, model } from "mongoose";
import { IUser, UserRole } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: Object.values(UserRole), required: true },
    phone: String,
    gender: String,
    address: String,
    profile_picture: String,
    hospital_id: String,
  },
  {
    discriminatorKey: "roleKey",
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

export const UserModel = model<IUser>("User", userSchema);
