import { BaseRepository } from "@org/fastify";

import { PrismaClient } from "../../libs/prisma/client";

export class ProfileRepository extends BaseRepository<PrismaClient> {
  protected readonly databaseKey = "prisma";

  findById(id: string) {
    return this.db.profile.findUnique({
      where: { id },
    });
  }

  findByAccountId(accountId: string) {
    return this.db.profile.findUnique({
      where: { accountId },
    });
  }

  create(accountId: string, nickname: string) {
    return this.db.profile.create({
      data: {
        accountId,
        nickname,
      },
    });
  }
}
