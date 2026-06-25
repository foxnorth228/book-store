import { z } from "zod";

export const envServerSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  HOST: z.string().default("0.0.0.0"),
  PATH_PREFIX: z.string().default("/"),
  PORT: z.coerce.number().int().positive().default(3000),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace"]).default("info"),

  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_HOST: z.coerce.string().optional(),
  DB_PORT: z.coerce.number().int().positive().default(5432),
  DB_NAME: z.string(),
});

export type EnvServerSchemaType = typeof envServerSchema;
export type EnvServerSchema = z.infer<EnvServerSchemaType>;
