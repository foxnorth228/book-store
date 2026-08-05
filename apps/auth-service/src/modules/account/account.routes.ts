import { authContracts, AuthLoginReq, AuthRegisterReq, zodToJsonSchema } from "@org/contracts";
import { errorBodySchema } from "@org/errors";
import { FastifyInstance, FastifyRequest } from "fastify";

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
    handler: async (request: FastifyRequest<{ Body: AuthLoginReq }>, reply) => {
      return accountController.login(request, reply);
    },
  });

  module.route({
    method: authContracts.register.method,
    url: authContracts.register.path,
    schema: {
      tags: [accountConfig.tags.account],
      body: module.getSchema(accountConfig.schemas.registerReq),
      response: {
        200: module.getSchema(accountConfig.schemas.registerRes),
      },
    },
    handler: async (request: FastifyRequest<{ Body: AuthRegisterReq }>) => {
      return accountController.register(request);
    },
  });
}
