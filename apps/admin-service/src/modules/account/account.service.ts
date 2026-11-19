import { BaseService } from "@org/fastify";

import { accountConfig } from "./account.config";
import { AccountRepository } from "./account.repository";
import { AuthAdminUserUpdatedDto } from "@org/contracts";

export class AccountService extends BaseService<AccountRepository> {
  protected readonly repositoryKey = accountConfig.repositoryName;

  async createAccount(data: AuthAdminUserUpdatedDto) {}
}
