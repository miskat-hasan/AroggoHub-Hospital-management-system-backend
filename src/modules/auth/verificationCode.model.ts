import { Document, model, Schema } from "mongoose";

export interface IVerifyCode extends Document {
  email: string;
  verificationCode: number;
  verified: boolean;
  createdAt?: Date;
}

const verificationSchema = new Schema<IVerifyCode>({
  email: { type: String, required: true },
  verificationCode: { type: Number, required: true },
  verified: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 15 * 60,
  },
});

export const VerifyCode = model("VerifyCode", verificationSchema);
