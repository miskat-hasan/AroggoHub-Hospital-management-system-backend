import { Schema, model } from "mongoose";
import { UserModel } from "../user.model";

const patientSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    age: Number,
    blood_group: String,
    occupation: String,
    emergency_contact: String,
    date_of_birth: Date,
    guardian_name: String,
    guardian_phone: String,
    is_walk_in: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const PatientModel = UserModel.discriminator("Patient", patientSchema);
