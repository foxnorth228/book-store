import { z } from "zod";

export const errorBodySchema = z.object({
  statusCode: z.number().positive(),
  code: z.string(),
  message: z.string(),
  details: z.unknown().optional(),
});
