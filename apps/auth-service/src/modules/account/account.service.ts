import { AuthEvents } from "@org/contracts";
import { UnauthorizedError } from "@org/errors";
import { BaseService } from "@org/fastify";
import { Languages } from "@org/localization";
import { hashPassword, verifyPassword } from "@org/shared";
import crypto from "crypto";

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

    const tokens = await this.generateTokens(account.id);

    return {
      id: account.id,
      ...tokens,
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

  async refreshTokens(refreshToken: string) {
    const userIdFromRedis = await this.app.redis.get(this.getRedisRefreshToken(refreshToken));
    if (!userIdFromRedis) {
      throw new UnauthorizedError("No session");
    }

    await this.removeSession(refreshToken);
    const tokens = await this.generateTokens(userIdFromRedis);

    return { id: userIdFromRedis, ...tokens };
  }

  async removeSession(refreshToken: string) {
    await this.app.redis.del(this.getRedisRefreshToken(refreshToken));
  }

  async generateTokens(id: string) {
    const accessToken = this.app.jwt.sign({
      sub: id,
    });

    const refreshToken = crypto.randomBytes(64).toString("hex");

    await this.app.redis.set(this.getRedisRefreshToken(refreshToken), id, {
      EX: this.app.config.env.JWT_REFRESH_TOKEN_EXPIRES_IN ?? 0,
    });

    return { accessToken, refreshToken };
  }

  private getRedisRefreshToken(refreshToken: string) {
    return `refresh:${refreshToken}`;
  }
}
