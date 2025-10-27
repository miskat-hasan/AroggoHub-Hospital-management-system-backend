import { Router } from "express";
import { createPatient } from "./patient.controller";

const router = Router();

router.post("/createPatient", createPatient);

export const PatientRoutes = router;
