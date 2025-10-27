import { Router } from "express";
import { createAdmin, createSuperAdmin } from "./superAdmin.controller";
import { checkRole, User } from "../../../middleware/auth";

const router = Router();

router.post("/createSuperAdmin", createSuperAdmin);
router.post("/createAdmin", User, checkRole("SuperAdmin"), createAdmin);

export const SuperAdminRoutes = router;
