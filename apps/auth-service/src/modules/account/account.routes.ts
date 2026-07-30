import { authContracts, zodToJsonSchema } from "@org/contracts";
import { errorBodySchema } from "@org/errors";
import { FastifyInstance } from "fastify";

import { accountConfig } from "./account.config";
import { AccountController } from "./account.controller";

export async function accountRoutes(module: FastifyInstance) {
  const accountController = module.getDecorator<AccountController>(accountConfig.controllerName);

  module.route({
    method: authContracts.login.method,
    url: authContracts.login.path,
    schema: {
      tags: [accountConfig.tags.account],
      body: module.getSchema(accountConfig.schemas.loginReq),
      response: {
        200: module.getSchema(accountConfig.schemas.loginRes),
        400: zodToJsonSchema(errorBodySchema),
      },
    },
    handler: accountController.login,
  });
}
