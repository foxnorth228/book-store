import { AuthLoginReq, AuthRegisterReq } from "@org/contracts";
import { BaseController } from "@org/fastify";
import { FastifyReply, FastifyRequest } from "fastify";

import { accountConfig } from "./account.config";
import { AccountService } from "./account.service";

export class AccountController extends BaseController<AccountService> {
  protected readonly serviceKey = accountConfig.serviceName;

  async login(request: FastifyRequest<{ Body: AuthLoginReq }>, reply: FastifyReply) {
    const { email, password } = request.body;

    const data = await this.service.login(email, password);

    reply.setCookie("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: this.app.config.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: Number.parseInt(this.app.config.env.JWT_REFRESH_TOKEN_EXPIRES_IN) ?? 0,
    });

    return {
      id: data.id,
      accessToken: data.accessToken,
    };
  }

  async register(request: FastifyRequest<{ Body: AuthRegisterReq }>) {
    const { email, password, language } = request.body;

    return this.service.register(email, password, language);
  }
}
