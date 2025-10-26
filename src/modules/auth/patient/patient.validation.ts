import { z } from "zod";

export const patientRegisterSchema = z.object({
  age: z.number().min(0).optional(),
  blood_group: z.string().optional(),
  occupation: z.string().optional(),
  date_of_birth: z.string().optional(),
  emergency_contact: z.string().optional(),
  is_walk_in: z.boolean().default(false),
  guardian_name: z.string().optional(),
  guardian_phone: z.string().optional(),
});
