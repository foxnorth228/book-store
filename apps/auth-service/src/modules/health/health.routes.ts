import { FastifyInstance } from "fastify";

import { healthConfig } from "./health.config";
import { HealthController } from "./health.interface";

export default async function HealthRoutes(module: FastifyInstance) {
  const healthController = module.getDecorator<HealthController>(healthConfig.controllerName);

  module.route({
    method: "GET",
    url: "/health",
    schema: {
      tags: ["Health"],
      response: {
        200: module.getSchema(healthConfig.schemas.healthRes),
      },
    },
    handler: healthController.getHealthStatus,
  });
}
