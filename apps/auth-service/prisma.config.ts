import { getDBUrlByConfig, loadServerEnv } from "@org/shared";
import { defineConfig } from "prisma/config";

const config = loadServerEnv(undefined, "apps/auth-service", { sources: ["postgres"] });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "pnpm exec tsx apps/auth-service/prisma/seed.ts",
  },
  datasource: {
    url: getDBUrlByConfig(config),
  },
});
