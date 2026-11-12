import { AuthAction, AuthRole } from "@org/contracts";
import { UnauthorizedError } from "@org/errors";
import { BaseService } from "@org/fastify";
import crypto from "crypto";

import { mapPrismaRoleToAuthRole } from "../../libs/utils/to-auth-role";
import { accountConfig } from "./account.config";
import { AccountRepository } from "./account.repository";
import { SessionPurpose } from "./session.type";

export class SessionService extends BaseService<AccountRepository> {
  protected readonly repositoryKey = accountConfig.repositoryName;

  async createSession(
    accountId: string,
    roles: AuthRole[],
    permissions: AuthAction[],
    purpose: SessionPurpose = "user",
  ) {
    const accessToken = this.app.jwt.sign(
      {
        sub: accountId,
        roles,
        permissions,
        aud: purpose,
      },
      {
        expiresIn:
          purpose === "admin"
            ? this.app.config.env.JWT_ADMIN_ACCESS_TOKEN_EXPIRES_IN
            : this.app.config.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
      },
    );

    const refreshToken = crypto.randomBytes(64).toString("hex");

    await this.app.redis.set(this.getRedisRefreshToken(refreshToken, purpose), accountId, {
      EX:
        purpose === "admin"
          ? this.app.config.env.JWT_ADMIN_REFRESH_TOKEN_EXPIRES_IN
          : (this.app.config.env.JWT_REFRESH_TOKEN_EXPIRES_IN ?? 0),
    });

    return { accessToken, refreshToken };
  }

  async refreshTokens(refreshToken: string, purpose: SessionPurpose = "user") {
    const redisKey = this.getRedisRefreshToken(refreshToken, purpose);
    const accountId = await this.app.redis.get(redisKey);

    if (!accountId) {
      throw new UnauthorizedError("No session");
    }

    const account = await this.repository.findById(accountId);

    if (!account) {
      await this.app.redis.del(redisKey);
      throw new UnauthorizedError("No session");
    }

    if (purpose === "admin" && !account.roles.some(({ role }) => role === "admin")) {
      await this.app.redis.del(redisKey);
      throw new UnauthorizedError("No session");
    }

    const roles = account.roles.map(({ role }) => mapPrismaRoleToAuthRole(role));

    await this.app.redis.del(redisKey);

    const tokens = await this.createSession(accountId, roles, purpose);

    return {
      id: accountId,
      ...tokens,
    };
  }

  async removeSession(refreshToken: string, purpose: SessionPurpose = "user") {
    await this.app.redis.del(this.getRedisRefreshToken(refreshToken, purpose));
  }

  private getRedisRefreshToken(refreshToken: string, purpose: SessionPurpose) {
    return `refresh:${purpose}:${refreshToken}`;
  }
}
