import { prismaClient } from "../../config/prisma";

export class ProfileRepository {
  findById(id: string) {
    return prismaClient.profile.findUnique({
      where: { id },
    });
  }

  findByEmail(email: string) {
    return prismaClient.profile.findUnique({
      where: { email },
    });
  }

  create(data: { email?: string; passwordHash?: string; region: string }) {
    return prismaClient.profile.create({
      data,
    });
  }

  update(id: string, data: Partial<{ email: string }>) {
    return prismaClient.profile.update({
      where: { id },
      data,
    });
  }
}
