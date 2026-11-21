import { BaseController } from "@org/fastify";

import { accountConfig } from "./account.config";
import { AccountService } from "./account.service";
import { AdminUsersListQuery } from "@org/contracts";

export class AccountController extends BaseController<AccountService> {
  protected override serviceKey = accountConfig.serviceName;

  async getUsersList(params: AdminUsersListQuery) {
    return this.service.getUsersList(params);
  }
}
