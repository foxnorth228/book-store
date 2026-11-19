import { FastifyInstance } from "fastify";

import { accountConfig } from "./account.config.js";
import { AccountController } from "./account.controller.js";
import { accountRoutes } from "./account.routes.js";
import { accountSchemas } from "./account.schema.js";
import { AccountService } from "./account.service.js";

async function AccountModule(app: FastifyInstance) {
  app.decorate(accountConfig.serviceName, new AccountService(app));

  app.decorate(accountConfig.controllerName, new AccountController(app));

  for (const schema of accountSchemas) {
    app.addSchema(schema);
  }

  app.register(accountRoutes);
}

export default AccountModule;
