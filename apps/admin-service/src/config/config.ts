import { loadServerEnv } from "@org/shared";
import { z } from "zod";

export const PATH_TO_PROJECT = "apps/admin-service";
export const DATABASE_PATH_NAME = "prisma";

export const adminServiceEnvSchema = z.object({});

export type AdminServiceEnvSchema = typeof adminServiceEnvSchema;
export type AdminServiceEnvConfig = z.infer<AdminServiceEnvSchema>;

export const serviceEnvConfig = loadServerEnv(adminServiceEnvSchema, PATH_TO_PROJECT, {
  sources: ["service", "jwt", "cookie", "postgres", "rabbitmq"],
});

export type ServiceEnvConfig = typeof serviceEnvConfig;
