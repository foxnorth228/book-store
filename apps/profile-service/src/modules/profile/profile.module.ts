import { FastifyInstance } from "fastify";

import { profileConfig } from "./profile.config.js";
import { registerProfileConsumers } from "./profile.consumer.js";
import { ProfileController } from "./profile.controller.js";
import { ProfileRepository } from "./profile.repository.js";
import { profileRoutes } from "./profile.routes.js";
import { profileSchemas } from "./profile.schema.js";
import { ProfileService } from "./profile.service.js";

async function profileModule(app: FastifyInstance) {
  app.decorate(profileConfig.repositoryName, new ProfileRepository(app));
  app.decorate(profileConfig.serviceName, new ProfileService(app));
  app.decorate(profileConfig.controllerName, new ProfileController(app));

  registerProfileConsumers(app);

  for (const schema of profileSchemas) {
    app.addSchema(schema);
  }
  app.register(profileRoutes);
}

export default profileModule;
