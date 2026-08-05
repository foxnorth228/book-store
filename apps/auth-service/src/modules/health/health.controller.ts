import { BaseController } from "@org/fastify";

import { healthConfig } from "./health.config";
import { HealthService } from "./health.service";

export class HealthController extends BaseController<HealthService> {
  protected readonly serviceKey = healthConfig.serviceName;

  async getHealthStatus() {
    console.log("1");
    return await this.service.getHealthStatus();
  }
}
