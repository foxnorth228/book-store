import { BaseRepository } from "@org/fastify";

import { PrismaClient } from "../../libs/prisma/client";

export class AccountRepository extends BaseRepository<PrismaClient> {
  protected readonly databaseKey = "";

  public findByEmail(email: string) {
    return this.db.account.findUnique({
      where: { email },
      select: { id: true, email: true, passwordHash: true },
    });
  }
}
