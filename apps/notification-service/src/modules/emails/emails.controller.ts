import { BaseController } from "@org/fastify";

import { emailsConfig } from "./emails.config";
import { EmailsService } from "./emails.service";

export class EmailsController extends BaseController<EmailsService> {
  protected override serviceKey = emailsConfig.serviceName;
}
