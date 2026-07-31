import { AuthLoginReq, AuthRegisterReq } from "@org/contracts";
import { BaseController } from "@org/fastify";
import { FastifyRequest } from "fastify";

import { accountConfig } from "./account.config";
import { AccountService } from "./account.service";

export class AccountController extends BaseController<AccountService> {
  protected readonly serviceKey = accountConfig.serviceName;

  async login(request: FastifyRequest<{ Body: AuthLoginReq }>) {
    const { email, password } = request.body;

    return this.service.login(email, password);
  }

  async register(request: FastifyRequest<{ Body: AuthRegisterReq }>) {
    const { email, password, language } = request.body;

    return this.service.register(email, password, language);
  }
}
