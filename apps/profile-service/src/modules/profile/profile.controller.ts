import { BaseController } from "@org/fastify";

import { profileConfig } from "./profile.config";
import { ProfileService } from "./profile.service";

export class ProfileController extends BaseController<ProfileService> {
  protected readonly serviceKey = profileConfig.serviceName;
}
