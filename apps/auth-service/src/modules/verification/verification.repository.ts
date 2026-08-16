import { BaseRepository } from "@org/fastify";

import { DATABASE_PATH_NAME } from "../../config/config";
import { PrismaClient } from "../../libs/prisma/client";

export class VerificationRepository extends BaseRepository<PrismaClient> {
  protected readonly databaseKey = DATABASE_PATH_NAME;
}
