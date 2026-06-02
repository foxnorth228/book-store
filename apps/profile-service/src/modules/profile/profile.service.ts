import { hashPassword } from "@org/shared";

import { ProfileRepository } from "./profile.repository";

export class ProfileService {
  constructor(private repo = new ProfileRepository()) {}

  async getProfile(id: string) {
    const profile = await this.repo.findById(id);

    if (!profile) {
      throw new Error("Profile not found");
    }

    return profile;
  }

  async createProfile(dto: { email: string; password: string; region: string }) {
    if (dto.email) {
      const existing = await this.repo.findByEmail(dto.email);

      if (existing) {
        throw new Error("Email already exists");
      }
    }

    const passwordHash = await hashPassword(dto.password);

    return this.repo.create({
      email: dto.email,
      passwordHash,
      region: dto.region,
    });
  }

  async updateEmail(id: string, email: string) {
    const existing = await this.repo.findByEmail(email);

    if (existing && existing.id !== id) {
      throw new Error("Email already in use");
    }

    return this.repo.update(id, { email });
  }
}
