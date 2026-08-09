import { BaseService } from "@org/fastify";

export class HealthService extends BaseService<null> {
  protected readonly repositoryKey = "";

  async getHealthStatus() {
    const module = this.app;

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
  }
}
