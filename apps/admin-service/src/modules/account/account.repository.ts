import { BaseRepository } from "@org/fastify";
import { PrismaClient } from "../../libs/prisma/client";
import {
  AdminUsersListQuery,
  AuthAdminUserUpdatedDto,
  ProfileAdminUserUpdatedDto,
} from "@org/contracts";

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

  async applyProfileSnapshots(snapshots: ProfileAdminUserUpdatedDto[]) {
    await this.db.adminUser.createMany({
      data: snapshots.map((s) => ({ accountId: s.accountId })),
      skipDuplicates: true,
    });

    await this.db.$transaction(
      snapshots.map((s) =>
        this.db.adminUser.updateMany({
          where: {
            accountId: s.accountId,
            OR: [{ profileUpdatedAt: null }, { profileUpdatedAt: { lte: s.profileUpdatedAt } }],
          },
          data: {
            firstName: s.firstName ?? null,
            surname: s.surname ?? null,
            nickname: s.nickname,
            profileUpdatedAt: s.profileUpdatedAt,
          },
        }),
      ),
    );
  }

  async getUsersList({ page, pageSize }: AdminUsersListQuery) {
    const [items, total] = await this.db.$transaction([
      this.db.adminUser.findMany({
        orderBy: [{ accountCreatedAt: "desc" }, { accountId: "asc" }],
        take: pageSize,
        skip: (page - 1) * pageSize,
      }),
      this.db.adminUser.count(),
    ]);

    return {
      items,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  }
}
