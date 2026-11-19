import { createPrismaPlugin } from "@org/fastify-plugins";
import { getDBUrlByConfig } from "@org/shared";
import { PrismaPg } from "@prisma/adapter-pg";
import fp from "fastify-plugin";

import { DATABASE_PATH_NAME } from "../config/config";
import { PrismaClient } from "../libs/prisma/client";

const prismaPlugin = fp(
  async (app) => {
    const adapter = new PrismaPg({
      connectionString: getDBUrlByConfig(app.config.env),
    });

    app.register(
      createPrismaPlugin({
        decoratorName: DATABASE_PATH_NAME,
        PrismaClient,
        prismaClientOptions: { adapter },
      }),
    );
  },
  { name: "prisma", fastify: "5.x" },
);

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

export default prismaPlugin;
