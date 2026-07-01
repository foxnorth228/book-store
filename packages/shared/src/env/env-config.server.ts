import dotenv from "dotenv";
import path from "path";

import { EnvServerConfig, EnvServerSchema, envServerSchema } from "./env-schema.server.js";

export function loadServerEnv<T extends EnvServerSchema>(
  schema: T = envServerSchema as T,
  servicePath: string,
) {
  if (process.env.NODE_ENV !== "production") {
    const postgresEnvPath = path.resolve("infrastructure/postgres/.env");
    const rabbitmqEnvPath = path.resolve("infrastructure/rabbitmq/.env");
    const redisEnvPath = path.resolve("infrastructure/redis/.env");
    const serviceEnvPath = path.resolve(servicePath, ".env");

    dotenv.config({ path: serviceEnvPath });
    dotenv.config({ path: postgresEnvPath, override: true });
    dotenv.config({ path: rabbitmqEnvPath, override: true });
    dotenv.config({ path: redisEnvPath, override: true });
  }

  return schema.parse(process.env);
}

export function getDBUrlByConfig<T extends EnvServerConfig>(config: T) {
  return `postgresql://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`;
}

export function getRabbitmqUrlByConfig<T extends EnvServerConfig>(config: T) {
  return `amqp://${config.RABBITMQ_USER}:${config.RABBITMQ_PASSWORD}@${config.RABBITMQ_HOST}:${config.RABBITMQ_PORT}`;
}

export function getRedisUrlByConfig<T extends EnvServerConfig>(config: T) {
  return `redis://:${config.REDIS_PASSWORD}@${config.REDIS_HOST}:${config.REDIS_PORT}`;
}
