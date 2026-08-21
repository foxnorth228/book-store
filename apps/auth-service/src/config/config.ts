import { loadServerEnv } from "@org/shared";
import ms, { StringValue } from "ms";
import { z } from "zod";

export const PATH_TO_PROJECT = "apps/auth-service";
export const DATABASE_PATH_NAME = "prisma";

export const authServiceEnvSchema = z.object({
  GRPC_SERVER_HOST: z.coerce.string().default("0.0.0.0"),
  GRPC_SERVER_PORT: z.coerce.number().default(50051),

  JWT_ACCESS_TOKEN_PRIVATE_KEY: z
    .string()
    .transform((v) => Buffer.from(v, "base64").toString("utf-8")),

  JWT_ACCESS_TOKEN_EXPIRES_IN: z
    .string()
    .refine((v) => ms(v as StringValue) !== undefined, {
      message: "Invalid duration",
    })
    .transform((v) => Math.floor(ms(v as StringValue)! / 1000)),
  JWT_REFRESH_TOKEN_EXPIRES_IN: z
    .string()
    .refine((v) => ms(v as StringValue) !== undefined, {
      message: "Invalid duration",
    })
    .transform((v) => Math.floor(ms(v as StringValue)! / 1000)),
});

export type AuthServiceEnvSchema = typeof authServiceEnvSchema;
export type AuthServiceEnvConfig = z.infer<AuthServiceEnvSchema>;

export const serviceEnvConfig = loadServerEnv(authServiceEnvSchema, PATH_TO_PROJECT, {
  sources: ["service", "postgres", "rabbitmq", "redis", "jwt", "cookie"],
});

export type ServiceEnvConfig = typeof serviceEnvConfig;
