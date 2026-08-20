import { FastifyInstance } from "fastify";

import { verificationConfig } from "./verification.config";
import { VerificationController } from "./verification.controller";
import { VerificationRepository } from "./verification.repository";
import { verificationRoutes } from "./verification.route";
import { verificationSchemas } from "./verification.schema";
import { VerificationService } from "./verification.service";

async function VerificationModule(app: FastifyInstance) {
  app.decorate(verificationConfig.repositoryName, new VerificationRepository(app));
  app.decorate(verificationConfig.serviceName, new VerificationService(app));
  app.decorate(verificationConfig.controllerName, new VerificationController(app));

  for (const schema of verificationSchemas) {
    app.addSchema(schema);
  }

  app.register(verificationRoutes);
}

export default VerificationModule;
