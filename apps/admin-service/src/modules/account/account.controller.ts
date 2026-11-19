import { BaseController } from "@org/fastify";

import { accountConfig } from "./account.config";
import { AccountService } from "./account.service";

export class AccountController extends BaseController<AccountService> {
  protected override serviceKey = accountConfig.serviceName;
}
