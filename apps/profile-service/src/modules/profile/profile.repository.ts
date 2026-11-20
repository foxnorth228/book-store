import { BaseRepository } from "@org/fastify";

import { PrismaClient } from "../../libs/prisma/client";
import { ProfileAdminUserUpdatedDto, ProfileEvents } from "@org/contracts";

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
    return this.db.$transaction(async (tx) => {
      const { count } = await tx.profile.createMany({
        data: [{ accountId, nickname }],
        skipDuplicates: true,
      });

      const profile = await tx.profile.findUniqueOrThrow({ where: { accountId } });

      if (count === 0) return profile;

      const adminProfilePayload: ProfileAdminUserUpdatedDto = {
        accountId: profile.accountId,
        firstName: profile.firstName,
        surname: profile.surname,
        nickname: profile.nickname,
        profileUpdatedAt: profile.updatedAt,
      };

      await tx.outboxEvent.create({
        data: {
          aggregateId: accountId,
          aggregateType: "Profile",
          eventType: ProfileEvents.adminProfileUpdated.route,
          payload: adminProfilePayload,
        },
      });

      return profile;
    });
  }
}
