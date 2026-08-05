import { z } from "zod";

export const envServerSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace"]).default("info"),

  HOST: z.string().default("0.0.0.0"),
  PATH_PREFIX: z.string().default("/"),
  PORT: z.coerce.number().int().positive().default(3000),

  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_HOST: z.coerce.string().default("0.0.0.0"),
  DB_PORT: z.coerce.number().int().positive().default(5432),
  DB_NAME: z.string(),

  RABBITMQ_HOST: z.string(),
  RABBITMQ_PORT: z.coerce.number().int().positive().default(5672),
  RABBITMQ_USER: z.string(),
  RABBITMQ_PASSWORD: z.string(),

  REDIS_HOST: z.string(),
  REDIS_PORT: z.coerce.number().int().positive().default(6379),
  REDIS_PASSWORD: z.string(),
});

export type EnvServerSchema = typeof envServerSchema;
export type EnvServerConfig = z.infer<EnvServerSchema>;
