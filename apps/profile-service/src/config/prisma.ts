import { getDBUrlByConfig, loadServerEnv } from "@org/shared";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

import { pathToProject } from "./config";

const config = loadServerEnv(pathToProject);

const adapter = new PrismaPg({
  connectionString: getDBUrlByConfig(config),
});

export const prismaClient = new PrismaClient({ adapter });
