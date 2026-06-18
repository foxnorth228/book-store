import { getDBUrlByConfig } from "@org/shared";
import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "../libs/prisma/client";
import { globalConfig } from "./config";

const adapter = new PrismaPg({
  connectionString: getDBUrlByConfig(globalConfig.env),
});

export const prismaClient = new PrismaClient({ adapter });
