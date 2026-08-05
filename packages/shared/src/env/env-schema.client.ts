import { z } from "zod";

export const envLocalDevClientSchema = z.object({
  AUTH_PORT: z.coerce.number().int().positive().default(3001),
  PROFILE_PORT: z.coerce.number().int().positive().default(3002),
});
