import { FastifyInstance } from "fastify";

import { accountConfig } from "./account.config.js";
import { AccountController } from "./account.controller.js";
import { adminContracts, AdminUsersListQuery, AuthAction } from "@org/contracts";

export async function accountRoutes(module: FastifyInstance) {
  const accountController = module.getDecorator<AccountController>(accountConfig.controllerName);

  module.route<{ Querystring: AdminUsersListQuery }>({
    config: {
      access: { permission: AuthAction.VIEW_USERS },
    },
    method: adminContracts.usersList.method,
    url: adminContracts.usersList.path,
    schema: {
      tags: [accountConfig.tags.account],
      security: [{ bearerAuth: [] }],
      querystring: module.getSchema(accountConfig.schemas.usersListQuery),
      response: {
        200: module.getSchema(accountConfig.schemas.usersListRes),
      },
    },
    handler: async (request) => {
      return accountController.getUsersList(request.query);
    },
  });
}
