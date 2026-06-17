import dotenv from "dotenv";
import path from "path";

import { envServerSchema } from "./env.server.js";

export function loadServerEnv(servicePath: string) {
  const infraEnvPath = path.resolve("infrastructure/postgres/.env");
  const serviceEnvPath = path.resolve(servicePath, ".env");

  if (process.env.NODE_ENV !== "production") {
    dotenv.config({ path: infraEnvPath });
    dotenv.config({ path: serviceEnvPath });
  }

  return envServerSchema.parse(process.env);
}

export function getDBUrlByConfig(config: ReturnType<typeof loadServerEnv>) {
  return (
    `postgresql://${config.DB_USER}:` +
    `${config.DB_PASSWORD}@` +
    `${config.DB_HOST ?? "0.0.0.0"}:` +
    `${config.DB_PORT}/` +
    `${config.DB_NAME}`
  );
}
