import dotenv from "dotenv";
import path from "path";

import { EnvServerConfig, EnvServerSchema, envServerSchema } from "./env-schema.server.js";

export function loadServerEnv<T extends EnvServerSchema>(
  schema: T = envServerSchema as T,
  servicePath: string,
) {
  const infraEnvPath = path.resolve("infrastructure/postgres/.env");
  const serviceEnvPath = path.resolve(servicePath, ".env");

  if (process.env.NODE_ENV !== "production") {
    dotenv.config({ path: infraEnvPath });
    dotenv.config({ path: serviceEnvPath });
  }

  return schema.parse(process.env);
}

export function getDBUrlByConfig<T extends EnvServerConfig>(config: T) {
  return `postgresql://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`;
}
