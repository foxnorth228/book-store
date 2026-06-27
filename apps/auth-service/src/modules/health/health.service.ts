import { FastifyInstance } from "fastify";

export const healthService = {
  async getHealthStatus(module: FastifyInstance) {
    const appHealthStatus = {
      database: { status: "down" },
      app: { status: "down" },
    };
    try {
      await module.prisma.$queryRaw`SELECT 1`;
      appHealthStatus.database.status = "up";
    } catch (error) {
      module.log.error(error);
      appHealthStatus.database.status = "down";
    }

    appHealthStatus.app.status = "up";

    return appHealthStatus;
  },
};
