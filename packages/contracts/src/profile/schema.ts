import { z } from "zod";

import { Provider, Region } from "./types.js";

export const regionSchema = z.enum(Region);

export const providerSchema = z.enum(Provider);

export const profileParamsSchema = z.object({
  id: z.string(),
});

export const profileResponseSchema = z.object({
  id: z.string(),
  email: z.email().optional(),
  region: regionSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const createProfileSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  region: regionSchema,
});

export type CreateProfileDTO = z.infer<typeof createProfileSchema>;
