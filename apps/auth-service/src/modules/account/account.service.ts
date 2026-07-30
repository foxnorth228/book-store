import { BaseService } from "@org/fastify";
import { verifyPassword } from "@org/shared";

import { accountConfig } from "./account.config";
import { InvalidCredentialsError } from "./account.errors";
import { AccountRepository } from "./account.repository";

export class AccountService extends BaseService<AccountRepository> {
  protected readonly repositoryKey = accountConfig.repositoryName;

  async login(email: string, password: string) {
    const account = await this.repository.findByEmail(email);

    if (!account) {
      throw new InvalidCredentialsError("Invalid email or password");
    }

    const isPasswordMatch = await verifyPassword(account.passwordHash, password);

    if (!isPasswordMatch) {
      throw new InvalidCredentialsError("Invalid email or password");
    }

    return {
      id: account.id,
      email: account.email,
    };
  }
}
