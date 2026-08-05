import { FastifyInstance } from "fastify";

import { healthConfig } from "./health.config";
import { HealthController } from "./health.interface";

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
    handler: healthController.getHealthStatus,
  });
}
