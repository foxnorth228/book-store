import { FastifyInstance } from "fastify";

import { emailsConfig } from "./emails.config.js";
import { registerEmailsConsumers } from "./emails.consumer.js";
import { EmailsController } from "./emails.controller.js";
import { emailsRoutes } from "./emails.routes.js";
import { emailsSchemas } from "./emails.schema.js";
import { EmailsService } from "./emails.service.js";

async function EmailsModule(app: FastifyInstance) {
  app.decorate(emailsConfig.serviceName, new EmailsService(app));
  app.decorate(emailsConfig.controllerName, new EmailsController(app));

  registerEmailsConsumers(app);

  for (const schema of emailsSchemas) {
    app.addSchema(schema);
  }

  app.register(emailsRoutes);
}

export default EmailsModule;
