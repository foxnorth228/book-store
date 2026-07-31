import { AuthEvents } from "@org/contracts";
import { BaseService } from "@org/fastify";
import { Languages } from "@org/localization";
import { hashPassword, verifyPassword } from "@org/shared";

import { Prisma } from "../../libs/prisma/client";
import { accountConfig } from "./account.config";
import { InvalidCredentialsError, UserAlreadyExistError } from "./account.errors";
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

  async register(email: string, password: string, language: Languages) {
    const passwordHash = await hashPassword(password);

    try {
      const account = await this.repository.create(email, passwordHash);

      await this.app.rabbitmq.publish(AuthEvents.exchange, AuthEvents.Registered, {
        accountId: account.id,
        language: language,
      });

      return { id: account.id, email: account.email };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
        throw new UserAlreadyExistError("User already exist");
      }

      this.app.log.error(e);
      throw e;
    }
  }
}
