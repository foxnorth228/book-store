import { z } from "zod";

export const errorBodySchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.unknown().optional(),
});
