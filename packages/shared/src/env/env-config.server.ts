import dotenv from "dotenv";
import path from "path";

import { envServerSchema, EnvServerSchemaType } from "./env-schema.server.js";

export function loadServerEnv<T extends EnvServerSchemaType | undefined>(
  baseSchema: T | EnvServerSchemaType = envServerSchema,
  servicePath: string,
) {
  const schema = baseSchema ?? envServerSchema;

  const infraEnvPath = path.resolve("infrastructure/postgres/.env");
  const serviceEnvPath = path.resolve(servicePath, ".env");

  if (process.env.NODE_ENV !== "production") {
    dotenv.config({ path: infraEnvPath });
    dotenv.config({ path: serviceEnvPath });
  }

  return schema.parse(process.env);
}

export function getDBUrlByConfig<T extends EnvServerSchemaType>(
  config: ReturnType<typeof loadServerEnv<T>>,
) {
  return (
    `postgresql://${config.DB_USER}:` +
    `${config.DB_PASSWORD}@` +
    `${config.DB_HOST ?? "0.0.0.0"}:` +
    `${config.DB_PORT}/` +
    `${config.DB_NAME}`
  );
}
