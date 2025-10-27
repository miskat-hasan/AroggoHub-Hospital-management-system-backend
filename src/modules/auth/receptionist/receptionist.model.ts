import { Schema } from "mongoose";
import { IReceptionist } from "../../../types/interface";
import { UserModel } from "../user.model";

const receptionistSchema = new Schema<IReceptionist>(
  {
    assigned_department: { type: Schema.Types.ObjectId, ref: "Department" },
    shift_time: String,
    experience_years: Number,
  },
  {
    timestamps: true,
  }
);

export const ReceptionistModel = UserModel.discriminator(
  "Receptionist",
  receptionistSchema
);
