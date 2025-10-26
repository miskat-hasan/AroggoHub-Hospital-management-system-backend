import { z } from "zod";

export const baseRegisterSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  password: z.string().min(6),
  role: z.enum(["Admin", "Receptionist", "Doctor", "Patient", "Nurse", "LabStaff"]),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});


export type RegisterInput = z.infer<typeof baseRegisterSchema>;
export type LoginInput = z.infer<typeof loginSchema>;