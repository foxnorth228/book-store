import { hashPassword } from "@org/shared";
import { FastifyInstance } from "fastify";

import { profileConfig } from "./profile.config";
import { ProfileRepository } from "./profile.repository";

export class ProfileService {
  constructor(private module: FastifyInstance) {}

  private getRepository() {
    const profileRepository = this.module.getDecorator<ProfileRepository>(
      profileConfig.repositoryName,
    );

    if (!(profileRepository instanceof ProfileRepository)) {
      throw new Error("wrong type");
    }

    return profileRepository;
  }

  async getProfile(id: string) {
    const repository = this.getRepository();
    const profile = await repository.findById(id);

    if (!profile) {
      throw new Error("Profile not found");
    }

    return profile;
  }

  async createProfile(dto: { email: string; password: string; region: string }) {
    const repository = this.getRepository();

    if (dto.email) {
      const existing = await repository.findByEmail(dto.email);

      if (existing) {
        throw new Error("Email already exists");
      }
    }

    const passwordHash = await hashPassword(dto.password);

    return repository.create({
      email: dto.email,
      passwordHash,
      region: dto.region,
    });
  }

  async updateEmail(id: string, email: string) {
    const repository = this.getRepository();

    const existing = await repository.findByEmail(email);

    if (existing && existing.id !== id) {
      throw new Error("Email already in use");
    }

    return repository.update(id, { email });
  }
}
