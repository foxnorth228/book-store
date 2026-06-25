import { getDBUrlByConfig } from "@org/shared";
import { PrismaPg } from "@prisma/adapter-pg";
import fp from "fastify-plugin";

import { globalConfig } from "../config/config";
import { PrismaClient } from "../libs/prisma/client";

const prismaPlugin = fp(
  async (app) => {
    const adapter = new PrismaPg({
      connectionString: getDBUrlByConfig(globalConfig.env),
    });
    const prismaClient = new PrismaClient({ adapter });
    await prismaClient.$connect();

    app.log.info("Database connected!");

    app.decorate("prisma", prismaClient);
    app.addHook("onClose", async (app) => {
      await app.prisma.$disconnect();
      app.log.info("Database connection closed!");
    });
  },
  { name: "prisma", fastify: "5.x" },
);

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

export default prismaPlugin;
