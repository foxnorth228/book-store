import { BaseController } from "@org/fastify";
import { FastifyRequest } from "fastify";

import { accountConfig } from "./account.config";
import { AccountService } from "./account.service";
import { AuthLoginReq } from "./account.types";

export class AccountController extends BaseController<AccountService> {
  protected readonly serviceKey = accountConfig.serviceName;

  async login(request: FastifyRequest<{ Body: AuthLoginReq }>) {
    const { email, password } = request.body;
    console.log(this.service, this.serviceKey);

    return this.service.login(email, password);
  }
}
