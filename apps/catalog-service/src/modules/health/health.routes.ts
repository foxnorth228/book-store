import { FastifyInstance } from "fastify";

import { healthConfig } from "./health.config";
import { HealthController } from "./health.controller";

export async function healthRoutes(module: FastifyInstance) {
  const healthController = module.getDecorator<HealthController>(healthConfig.controllerName);

  module.route({
    method: "GET",
    url: healthConfig.urls.health,
    schema: {
      tags: ["Health"],
      response: {
        200: module.getSchema(healthConfig.schemas.healthRes),
      },
    },
    handler: async () => {
      return await healthController.getHealthStatus();
    },
  });
}
