import { getDBUrlByConfig, loadServerEnv } from "@org/shared";
import { defineConfig } from "prisma/config";

const config = loadServerEnv(undefined, "apps/catalog-service");

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: getDBUrlByConfig(config),
  },
});
