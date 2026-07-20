import { FastifyInstance } from "fastify";

import { profileConfig } from "./profile.config.js";
import { createProfileController } from "./profile.controller.js";
import { profileRoutes } from "./profile.routes.js";
import { profileSchemas } from "./profile.schema.js";
import { ProfileService } from "./profile.service.js";

async function profileModule(app: FastifyInstance) {
  app.decorate(profileConfig.serviceName, new ProfileService(app));
  app.decorate(profileConfig.controllerName, createProfileController(app));

  for (const schema of profileSchemas) {
    app.addSchema(schema);
  }
  app.register(profileRoutes);
}

export default profileModule;
