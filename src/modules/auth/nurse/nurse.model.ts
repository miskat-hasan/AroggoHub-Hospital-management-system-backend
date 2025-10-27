import { Schema } from "mongoose";
import { INurse } from "../../../types/interface";
import { UserModel } from "../user.model";

const nurseSchema = new Schema<INurse>(
  {
    assigned_department: { type: Schema.Types.ObjectId, ref: "Department" },
    assigned_room: { type: Schema.Types.ObjectId, ref: "Room" },
    shift: String,
    qualifications: [String],
  },
  {
    timestamps: true,
  }
);

export const NurseModel = UserModel.discriminator("Nurse", nurseSchema);