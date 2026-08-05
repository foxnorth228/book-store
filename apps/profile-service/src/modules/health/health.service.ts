import { FastifyInstance } from "fastify";

export const healthService = {
  async getHealthStatus(module: FastifyInstance) {
    const appHealthStatus = {
      app: { status: "down" },
      database: { status: "down" },
      rabbitmq: { status: "down" },
      redis: { status: "down" },
    };

    // database
    try {
      await module.prisma.$queryRaw`SELECT 1`;
      appHealthStatus.database.status = "up";
    } catch (error) {
      module.log.error(error);
    }

    // rabbitmq
    try {
      const isReady = await module.rabbitmq.isReady();
      if (isReady) {
        appHealthStatus.rabbitmq.status = "up";
      }
    } catch (error) {
      module.log.error(error);
    }

    appHealthStatus.app.status = "up";

    return appHealthStatus;
  },
};
