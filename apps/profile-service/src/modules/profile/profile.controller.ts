import { BaseController } from "@org/fastify";
import { FastifyRequest } from "fastify";

import { profileConfig } from "./profile.config";
import { ProfileService } from "./profile.service";

export class ProfileController extends BaseController<ProfileService> {
  protected readonly serviceKey = profileConfig.serviceName;

  async getMyProfile(request: FastifyRequest) {
    const accountId = request.user.sub;

    return this.service.getProfileByAccountId(accountId);
  }
}
