import { FastifyInstance } from "fastify";

import { healthConfig } from "./health.config.js";
import { HealthController } from "./health.controller.js";
import { healthRoutes } from "./health.routes.js";
import { healthSchemas } from "./health.schema.js";
import { HealthService } from "./health.service.js";

async function HealthModule(app: FastifyInstance) {
  app.decorate(healthConfig.serviceName, new HealthService(app));
  app.decorate(healthConfig.controllerName, new HealthController(app));

  for (const schema of healthSchemas) {
    app.addSchema(schema);
  }
  app.register(healthRoutes);
}

export default HealthModule;
