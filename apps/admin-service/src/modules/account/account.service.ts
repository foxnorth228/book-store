import { BaseService } from "@org/fastify";

import { accountConfig } from "./account.config";
import { AccountRepository } from "./account.repository";
import { AuthAdminUserUpdatedDto, ProfileAdminUserUpdatedDto } from "@org/contracts";

export class AccountService extends BaseService<AccountRepository> {
  protected readonly repositoryKey = accountConfig.repositoryName;

  async applyAccountSnapshots(data: AuthAdminUserUpdatedDto[]) {
    return await this.repository.applyAccountSnapshots(data);
  }

  async applyProfileSnapshots(data: ProfileAdminUserUpdatedDto[]) {
    return await this.repository.applyProfileSnapshots(data);
  }
}
