import { BaseRepository } from "@org/fastify";
import { PrismaClient } from "../../libs/prisma/client";
import { AuthAdminUserUpdatedDto } from "@org/contracts";

export class AccountRepository extends BaseRepository<PrismaClient> {
  protected readonly databaseKey = "prisma";

  async applyAccountSnapshots(snapshots: AuthAdminUserUpdatedDto[]) {
    await this.db.adminUser.createMany({
      data: snapshots.map((s) => ({ accountId: s.accountId })),
      skipDuplicates: true,
    });

    await this.db.$transaction(
      snapshots.map((s) =>
        this.db.adminUser.updateMany({
          where: {
            accountId: s.accountId,
            OR: [{ accountUpdatedAt: null }, { accountUpdatedAt: { lte: s.accountUpdatedAt } }],
          },
          data: {
            email: s.email,
            emailVerifiedAt: s.emailVerifiedAt,
            accountCreatedAt: s.accountCreatedAt,
            accountUpdatedAt: s.accountUpdatedAt,
          },
        }),
      ),
    );
  }
}
