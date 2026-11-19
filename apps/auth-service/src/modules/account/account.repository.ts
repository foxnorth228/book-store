import { BaseRepository } from "@org/fastify";

import { DATABASE_PATH_NAME } from "../../config/config";
import { PrismaClient, Role } from "../../libs/prisma/client";
import { AuthAccountRegisteredEventDto, AuthEvents } from "@org/contracts";

export class AccountRepository extends BaseRepository<PrismaClient> {
  protected readonly databaseKey = DATABASE_PATH_NAME;

  public findById(id: string) {
    return this.db.account.findUnique({
      where: { id },
      select: { id: true, email: true, passwordHash: true, roles: true, permissions: true },
    });
  }

  public findByEmail(email: string) {
    return this.db.account.findUnique({
      where: { email },
      select: { id: true, email: true, passwordHash: true, roles: true, permissions: true },
    });
  }

  public create(email: string, passwordHash: string, nickname: string) {
    return this.db.$transaction(async (tx) => {
      const account = await tx.account.create({
        data: {
          email,
          passwordHash,
        },
      });

      await tx.outboxEvent.create({
        data: {
          aggregateId: account.id,
          aggregateType: "Account",
          eventType: AuthEvents.registered.route,
          payload: {
            accountId: account.id,
            nickname,
          } as AuthAccountRegisteredEventDto,
        },
      });

      return account;
    });
  }

  public findRolePermissions(roles: Role[]) {
    return this.db.rolePermission.findMany({
      where: {
        role: {
          in: roles,
        },
      },
      select: {
        role: true,
        permission: true,
      },
    });
  }
}
