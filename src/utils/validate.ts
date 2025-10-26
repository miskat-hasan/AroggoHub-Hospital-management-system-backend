import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
  (schema: ZodSchema<any>) =>
    (req: Request, res: Response, next: NextFunction) => {
      try {
        schema.parse(req.body);
        next();
      } catch (err: any) {
        const errors = err.errors?.map((e: any) => e.message) || [err.message];
        return res.status(400).json({ success: false, errors });
      }
    };
