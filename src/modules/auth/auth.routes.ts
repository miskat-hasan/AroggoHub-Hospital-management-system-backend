import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router()

// router.post('/login',loginController)
router.post('/register', AuthController.register)
// router.post('/logout',logoutController)

export const AuthRoutes = router;