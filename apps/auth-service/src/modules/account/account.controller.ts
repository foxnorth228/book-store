import { authContracts, AuthLoginReq, AuthLoginRes, AuthRegisterReq } from "@org/contracts";
import { UnauthorizedError } from "@org/errors";
import { BaseController } from "@org/fastify";
import { FastifyReply, FastifyRequest } from "fastify";

import { accountConfig } from "./account.config";
import { AccountService } from "./account.service";

export class AccountController extends BaseController<AccountService> {
  protected readonly serviceKey = accountConfig.serviceName;

  async login(request: FastifyRequest<{ Body: AuthLoginReq }>, reply: FastifyReply) {
    const { email, password } = request.body;

    const data = await this.service.login(email, password);
    await this.setRefreshTokenCookie(reply, data.refreshToken);

    return {
      id: data.id,
      accessToken: data.accessToken,
    };
  }

  async register(request: FastifyRequest<{ Body: AuthRegisterReq }>) {
    const { email, password, language } = request.body;

    return this.service.register(email, password, language);
  }

  async refreshSession(request: FastifyRequest, reply: FastifyReply): Promise<AuthLoginRes> {
    const refreshToken = request.cookies.refreshToken;
    if (!refreshToken) {
      throw new UnauthorizedError("No session");
    }

    const data = await this.service.refreshTokens(refreshToken);
    await this.setRefreshTokenCookie(reply, data.refreshToken);

    return { id: data.id, accessToken: data.accessToken };
  }

  async logout(request: FastifyRequest, reply: FastifyReply) {
    const refreshToken = request.cookies.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedError("No session");
    }

    await this.service.removeSession(refreshToken);
    this.clearRefreshTokenCookie(reply);

    return;
  }

  private async setRefreshTokenCookie(reply: FastifyReply, token: string) {
    reply.setCookie(accountConfig.refreshTokenName, token, {
      httpOnly: true,
      secure: this.app.config.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: this.app.config.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
      path: `/${this.app.config.env.PATH_PREFIX}${authContracts.session.prefix}`,
    });
  }

  private clearRefreshTokenCookie(reply: FastifyReply) {
    reply.clearCookie(accountConfig.refreshTokenName, {
      path: `${this.app.config.env.PATH_PREFIX}${authContracts.session.prefix}`,
    });
  }
}
