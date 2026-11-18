import { BaseService } from "@org/fastify";

import { profileConfig } from "./profile.config";
import { ProfileRepository } from "./profile.repository";

export class ProfileService extends BaseService<ProfileRepository> {
  protected override readonly repositoryKey = profileConfig.repositoryName;

  async createProfile(accountId: string, nickname: string) {
    const profile = await this.repository.create(accountId, nickname);

    return profile;
  }

  async getProfileByAccountId(accountId: string) {
    return this.repository.findByAccountId(accountId);
  }
}
