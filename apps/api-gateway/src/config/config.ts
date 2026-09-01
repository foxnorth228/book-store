import { z } from "zod";
import { loadServerEnv } from "@org/shared";

export const PATH_TO_PROJECT = "apps/api-gateway";

export const apiGatewayEnvSchema = z.object({
  AUTH_HOST: z.string(),
  AUTH_PORT: z.coerce.number().int().positive(),
  AUTH_PATH_PREFIX: z.string(),

  PROFILE_HOST: z.string(),
  PROFILE_PORT: z.coerce.number().int().positive(),
  PROFILE_PATH_PREFIX: z.string(),

  CATALOG_HOST: z.string(),
  CATALOG_PORT: z.coerce.number().int().positive(),
  CATALOG_PATH_PREFIX: z.string(),

  NOTIFICATION_HOST: z.string(),
  NOTIFICATION_PORT: z.coerce.number().int().positive(),
  NOTIFICATION_PATH_PREFIX: z.string(),
});

export type ApiGatewayEnvSchema = typeof apiGatewayEnvSchema;
export type ApiGatewayEnvConfig = z.infer<ApiGatewayEnvSchema>;

export const serviceEnvConfig = loadServerEnv(apiGatewayEnvSchema, PATH_TO_PROJECT, {
  sources: ["service", "jwt", "cookie"],
});

export type ServiceEnvConfig = typeof serviceEnvConfig;
