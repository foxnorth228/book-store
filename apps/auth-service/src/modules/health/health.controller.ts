import { FastifyInstance } from "fastify";

import { healthConfig } from "./health.config";
import { HealthService } from "./health.interface";

export const createHealthController = (module: FastifyInstance) => {
  return {
    async getHealthStatus() {
      const healthService = module.getDecorator<HealthService>(healthConfig.serviceName);
      const healthStatus = await healthService.getHealthStatus(module);
      return healthStatus;
    },
  };
};
