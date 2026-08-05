import { config } from "dotenv";
import { resolve } from "path";

import { envLocalDevClientSchema } from "./env-schema.client.js";

export function loadLocalDevClientEnv(rootDir: string) {
  const authEnv = config({
    path: resolve(rootDir, "apps/auth-service/.env"),
  }).parsed;

  const profileEnv = config({
    path: resolve(rootDir, "apps/profile-service/.env"),
  }).parsed;

  return envLocalDevClientSchema.parse({
    AUTH_PORT: authEnv?.PORT,
    PROFILE_PORT: profileEnv?.PORT,
  });
}
