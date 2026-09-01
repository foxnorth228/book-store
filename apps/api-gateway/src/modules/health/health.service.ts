import { BaseService } from "@org/fastify";

export class HealthService extends BaseService<null> {
  protected readonly repositoryKey = "";

  async getHealthStatus() {
    const appHealthStatus = {
      app: { status: "down" },
    };

    appHealthStatus.app.status = "up";

    return appHealthStatus;
  }
}
