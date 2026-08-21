import dotenv from "dotenv";
import path from "path";
import z from "zod";

import { envSourceSchemas } from "./env-schema.server.js";
import {
  EnvDatabaseSchema,
  EnvRabbitmqSchema,
  EnvRedisSchema,
  ServerEnvConfig,
  ServerEnvSource,
} from "./env-type.server.js";

export interface LoadServerEnvOptions<S extends readonly ServerEnvSource[] = []> {
  sources?: S;
}

export function loadServerEnv<
  T extends z.ZodObject | undefined = undefined,
  S extends readonly ServerEnvSource[] = readonly [],
>(schema: T, servicePath: string, options: LoadServerEnvOptions<S> = {}): ServerEnvConfig<T, S> {
  if (process.env.NODE_ENV !== "production") {
    const sources: readonly ServerEnvSource[] = options.sources ?? [];

    if (sources.includes("service")) {
      dotenv.config({
        path: path.resolve(servicePath, ".env"),
      });
    }

    if (sources.includes("postgres")) {
      dotenv.config({
        path: path.resolve("infrastructure/postgres/.env"),
        override: true,
      });
    }

    if (sources.includes("rabbitmq")) {
      dotenv.config({
        path: path.resolve("infrastructure/rabbitmq/.env"),
        override: true,
      });
    }

    if (sources.includes("redis")) {
      dotenv.config({
        path: path.resolve("infrastructure/redis/.env"),
        override: true,
      });
    }
  }

  let extendedShape: z.ZodRawShape = {};

  for (const source of options.sources ?? []) {
    extendedShape = { ...extendedShape, ...envSourceSchemas[source].shape };
  }

  const parsed = (schema ?? z.object({})).extend(extendedShape).parse(process.env);

  return parsed as ServerEnvConfig<T, S>;
}

export function getDBUrlByConfig<T extends EnvDatabaseSchema>(config: T) {
  return `postgresql://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`;
}

export function getRabbitmqUrlByConfig<T extends EnvRabbitmqSchema>(config: T) {
  return `amqp://${config.RABBITMQ_USER}:${config.RABBITMQ_PASSWORD}@${config.RABBITMQ_HOST}:${config.RABBITMQ_PORT}`;
}

export function getRedisUrlByConfig<T extends EnvRedisSchema>(config: T) {
  return `redis://:${config.REDIS_PASSWORD}@${config.REDIS_HOST}:${config.REDIS_PORT}`;
}
