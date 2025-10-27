import { Schema, model } from "mongoose";
import { UserModel } from "../user.model";

const doctorSchema = new Schema(
  {
    department_id: { type: Schema.Types.ObjectId, ref: "Department" },
    specialization: [String],
    qualification: [String],
    experience_years: Number,
    consultation_fee: Number,
  },
  { timestamps: true }
);

export const DoctorModel = UserModel.discriminator("Doctor", doctorSchema);
