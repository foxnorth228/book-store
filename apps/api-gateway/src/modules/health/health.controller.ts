import { BaseController } from "@org/fastify";

import { healthConfig } from "./health.config";
import { HealthService } from "./health.service";

export class HealthController extends BaseController<HealthService> {
  protected override serviceKey = healthConfig.serviceName;

  async getHealthStatus() {
    return await this.service.getHealthStatus();
  }
}
