import { Schema } from "mongoose";
import { IAdmin } from "../../../types/interface";
import { UserModel } from "../user.model";

const adminModel = new Schema<IAdmin>({
    
});

export const Admin = UserModel.discriminator("Admin", adminModel);
