import { Schema } from "mongoose";
import { ILabStaff } from "../../../types/interface";
import { UserModel } from "../user.model";

const labStaffSchema = new Schema<ILabStaff>(
  {
    department_id: {
      type: Schema.Types.ObjectId,
      ref: "Department",
    },
    specialization: String,
    shift: String,
    certification: String,
  },
  {
    timestamps: true,
  }
);

export const LabStaffModel = UserModel.discriminator(
  "LabStaff",
  labStaffSchema
);
