import { FastifyInstance } from "fastify";

import { emailsConfig } from "./emails.config.js";
import { EmailsController } from "./emails.controller.js";

export async function emailsRoutes(module: FastifyInstance) {
  const emailsController = module.getDecorator<EmailsController>(emailsConfig.controllerName);

  console.log(emailsController);
  // TODO: Add routes
}
