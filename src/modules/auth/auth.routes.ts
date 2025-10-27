import { Router } from "express";
import {
  changePassword,
  deleteUser,
  forgetPassword,
  login,
  logout,
  profile,
  sendForgetPassCode,
  sendVerificationCode,
  updateUser,
  verifyCode,
} from "./auth.controller";
import { User } from "../../middleware/auth";

const router = Router();

router.post("/sendSignUpCode", sendVerificationCode);
router.post("/verifySignUpCode", verifyCode);
router.post("/login", login);
router.get("/profile", User, profile);
router.put("/updateProfile", User, updateUser);
router.put("/deleteUser", User, deleteUser);
router.put("/changePassword", User, changePassword);
router.post("/sendForgetPasswordCode", sendForgetPassCode);
router.post("/forgetPassCode", forgetPassword);
router.post("/logout", User, logout);

export const AuthRoutes = router;
