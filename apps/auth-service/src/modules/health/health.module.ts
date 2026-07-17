import { FastifyInstance } from "fastify";

import { healthConfig } from "./health.config.js";
import { createHealthController } from "./health.controller.js";
import { healthRoutes } from "./health.routes.js";
import { healthSchemas } from "./health.schema.js";
import { healthService } from "./health.service.js";

async function HealthModule(app: FastifyInstance) {
  app.decorate(healthConfig.serviceName, healthService);
  app.decorate(healthConfig.controllerName, createHealthController(app));

  for (const schema of healthSchemas) {
    app.addSchema(schema);
  }
  app.register(healthRoutes);
}

export default HealthModule;
