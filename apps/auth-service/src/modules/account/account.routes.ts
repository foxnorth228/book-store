import { FastifyInstance } from "fastify";

import { accountConfig } from "./account.config";
import { AccountController } from "./account.interface";

export async function accountRoutes(module: FastifyInstance) {
  const accountController = module.getDecorator<AccountController>(accountConfig.controllerName);

  module.route({
    method: "POST",
    url: accountConfig.urls.register,
    schema: {
      tags: [accountConfig.tags.account],
      body: module.getSchema(accountConfig.schemas.accountUserReq),
      response: {
        204: {},
      },
    },
    handler: accountController.createAccount,
  });
}
