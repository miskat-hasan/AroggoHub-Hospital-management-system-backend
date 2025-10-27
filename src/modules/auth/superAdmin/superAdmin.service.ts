import type { Request } from "express";
import { SuperAdmin } from "./superAdmin.model";
import bcrypt from "bcrypt";
import { Admin } from "../Admin/admin.model";

const createSuperAdminAccount = async (req: Request) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new Error("Please provide name, email and password");
  }

  const user = await SuperAdmin.findOne({ email });
  if (user) {
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);

  const newUser = await SuperAdmin.create({
    name,
    email,
    password: hashedPass,
    role: "SuperAdmin",
  });

  return {
    success: true,
    message: "Super admin account created successfully",
    admin: newUser,
  };
};

const createAdminAcc = async (req: Request) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new Error("Please provide name, email and password");
  }

  const user = await Admin.findOne({ email });
  if (user) {
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);

  const newUser = await Admin.create({
    name,
    email,
    password: hashedPass,
    role: "Admin",
  });

  return {
    success: true,
    message: "Admin account created successfully",
    admin: newUser,
  };
};

export const SuperAdminService = { createSuperAdminAccount, createAdminAcc };
