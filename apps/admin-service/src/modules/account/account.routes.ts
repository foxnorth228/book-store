import { FastifyInstance } from "fastify";

import { accountConfig } from "./account.config.js";
import { AccountController } from "./account.controller.js";
import { adminContracts, AdminUsersListQuery } from "@org/contracts";

export async function accountRoutes(module: FastifyInstance) {
  const accountController = module.getDecorator<AccountController>(accountConfig.controllerName);

  module.route<{ Querystring: AdminUsersListQuery }>({
    method: adminContracts.usersList.method,
    url: adminContracts.usersList.path,
    schema: {
      tags: [accountConfig.tags.account],
      querystring: module.getSchema(accountConfig.schemas.usersListQuery),
      response: {
        200: module.getSchema(accountConfig.schemas.usersListRes),
      },
    },
    preHandler: [module.authenticate],
    handler: async (request) => {
      return accountController.getUsersList(request.query);
    },
  });
}
