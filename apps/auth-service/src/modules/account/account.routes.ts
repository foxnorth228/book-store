import { authContracts, AuthLoginReq, AuthRegisterReq, zodToJsonSchema } from "@org/contracts";
import { BadRequestError, errorBodySchema } from "@org/errors";
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
    preHandler: async (request) => {
      const data = request.body;
      const result = await authContracts.register.body.safeParseAsync(data);

      if (!result.success) {
        throw new BadRequestError("Incorrect data");
      }

      return;
    },
    handler: async (request: FastifyRequest<{ Body: AuthRegisterReq }>) => {
      console.log("register");
      return accountController.register(request);
    },
  });
  module.route({
    method: authContracts.session.refresh.method,
    url: `${authContracts.session.prefix}${authContracts.session.refresh.path}`,
    schema: {
      tags: [accountConfig.tags.account],
      response: {
        200: module.getSchema(accountConfig.schemas.loginRes),
      },
    },
    handler: async (request, reply) => {
      return accountController.refreshSession(request, reply);
    },
  });
  module.route({
    method: authContracts.session.logout.method,
    url: `${authContracts.session.prefix}${authContracts.session.logout.path}`,
    schema: {
      tags: [accountConfig.tags.account],
      response: {
        204: {},
      },
    },
    handler: async (request, reply) => {
      return accountController.logout(request, reply);
    },
  });
}
