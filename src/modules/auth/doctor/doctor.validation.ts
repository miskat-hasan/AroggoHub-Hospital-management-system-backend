import { z } from "zod";

export const doctorRegisterSchema = z.object({
  department_id: z.string(),
  specialization: z.array(z.string()).optional(),
  qualification: z.array(z.string()).optional(),
  experience_years: z.number().optional(),
  consultation_fee: z.number().optional(),
});
