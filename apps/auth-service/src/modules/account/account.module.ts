import { FastifyInstance } from "fastify";

import { accountConfig } from "./account.config.js";
import { AccountController } from "./account.controller.js";
import { AccountRepository } from "./account.repository.js";
import { accountRoutes } from "./account.routes.js";
import { accountSchemas } from "./account.schema.js";
import { AccountService } from "./account.service.js";
import { AccountAdminController } from "./admin.controller.js";

async function AccountModule(app: FastifyInstance) {
  app.decorate(accountConfig.repositoryName, new AccountRepository(app));
  app.decorate(accountConfig.serviceName, new AccountService(app));
  app.decorate(accountConfig.controllerName, new AccountController(app));
  app.decorate(accountConfig.controllerAdminName, new AccountAdminController(app));

  for (const schema of accountSchemas) {
    app.addSchema(schema);
  }
  app.register(accountRoutes);
}

export default AccountModule;
