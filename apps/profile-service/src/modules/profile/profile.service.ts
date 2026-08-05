import { BaseService } from "@org/fastify";
import { Languages } from "@org/localization";

import { profileConfig } from "./profile.config";
import { ProfileRepository } from "./profile.repository";

export class ProfileService extends BaseService<ProfileRepository> {
  protected override readonly repositoryKey = profileConfig.repositoryName;

  async getProfile(id: string) {
    const profile = await this.repository.findById(id);

    if (!profile) {
      throw new Error("Profile not found");
    }

    return profile;
  }

  async createProfile(accountId: string, language: Languages) {
    const profile = this.repository.create(accountId, language);

    return profile;
  }
}
