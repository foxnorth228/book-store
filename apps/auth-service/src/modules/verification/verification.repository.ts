import { BaseRepository } from "@org/fastify";

import { DATABASE_PATH_NAME } from "../../config/config";
import { PrismaClient } from "../../libs/prisma/client";

export class VerificationRepository extends BaseRepository<PrismaClient> {
  protected readonly databaseKey = DATABASE_PATH_NAME;

  public findByEmail(email: string) {
    return this.db.account.findUnique({
      where: { email },
      select: { id: true, email: true },
    });
  }

  public updateUserPassword(userId: string, passwordHash: string) {
    return this.db.account.update({ where: { id: userId }, data: { passwordHash } });
  }
}
