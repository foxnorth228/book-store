import { BaseController } from "@org/fastify";
import { accountConfig } from "./account.config";
import { AccountService } from "./account.service";
import { FastifyReply, FastifyRequest } from "fastify";
import { authContracts, AuthLoginAdminReq, AuthLoginAdminRes } from "@org/contracts";
import { UnauthorizedError } from "@org/errors";

export class AccountAdminController extends BaseController<AccountService> {
  protected readonly serviceKey = accountConfig.serviceName;

  async login(request: FastifyRequest<{ Body: AuthLoginAdminReq }>, reply: FastifyReply) {
    const { email, password } = request.body;

    const data = await this.service.loginAdmin(email, password);
    await this.setRefreshTokenCookie(reply, data.refreshToken);

    return {
      id: data.id,
      accessToken: data.accessToken,
    };
  }

  async refreshSession(request: FastifyRequest, reply: FastifyReply): Promise<AuthLoginAdminRes> {
    const refreshToken = request.cookies.refreshToken;
    if (!refreshToken) {
      throw new UnauthorizedError("No session");
    }

    const data = await this.service.refreshTokens(refreshToken, "admin");
    await this.setRefreshTokenCookie(reply, data.refreshToken);

    return { id: data.id, accessToken: data.accessToken };
  }

  async logout(request: FastifyRequest, reply: FastifyReply) {
    const refreshToken = request.cookies.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedError("No session");
    }

    await this.service.removeSession(refreshToken, "admin");
    this.clearRefreshTokenCookie(reply);

    return;
  }

  private async setRefreshTokenCookie(reply: FastifyReply, token: string) {
    reply.setCookie(accountConfig.refreshTokenName, token, {
      httpOnly: true,
      secure: this.app.config.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: this.app.config.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
      path: `${this.app.config.env.PATH_PREFIX}${authContracts.admin.prefix}${authContracts.admin.session.prefix}`,
    });
  }

  private clearRefreshTokenCookie(reply: FastifyReply) {
    reply.clearCookie(accountConfig.refreshTokenName, {
      httpOnly: true,
      secure: this.app.config.env.NODE_ENV === "production",
      sameSite: "lax",
      path: `${this.app.config.env.PATH_PREFIX}${authContracts.admin.prefix}${authContracts.admin.session.prefix}`,
    });
  }
}
