import { loadServerEnv } from "@org/shared";
import { z } from "zod";

export const PATH_TO_PROJECT = "apps/profile-service";

export const profileServiceEnvSchema = z.object({
  GRPC_AUTH_HOST: z.coerce.string().default("0.0.0.0"),
  GRPC_AUTH_PORT: z.coerce.number().default(50051),
});

export type ProfileServiceEnvSchema = typeof profileServiceEnvSchema;
export type ProfileServiceEnvConfig = z.infer<ProfileServiceEnvSchema>;

export const serviceEnvConfig = loadServerEnv(profileServiceEnvSchema, PATH_TO_PROJECT, {
  sources: ["service", "postgres", "rabbitmq", "redis", "jwt", "cookie"],
});

export type ServiceEnvConfig = typeof serviceEnvConfig;
