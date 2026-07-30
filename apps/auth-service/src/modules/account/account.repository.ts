import { BaseRepository } from "@org/fastify";

import { DATABASE_PATH_NAME } from "../../config/config";
import { PrismaClient } from "../../libs/prisma/client";

export class AccountRepository extends BaseRepository<PrismaClient> {
  protected readonly databaseKey = DATABASE_PATH_NAME;

  public findByEmail(email: string) {
    return this.db.account.findUnique({
      where: { email },
      select: { id: true, email: true, passwordHash: true },
    });
  }
}
