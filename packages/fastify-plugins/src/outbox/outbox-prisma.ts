import { OutboxRecord, OutboxStore } from "./outbox.types.js";

type RawSqlClient = {
  $queryRaw<T = unknown>(strings: TemplateStringsArray, ...values: unknown[]): Promise<T>;
  $executeRaw(strings: TemplateStringsArray, ...values: unknown[]): Promise<number>;
};

export class PrismaOutboxStore implements OutboxStore {
  constructor(
    private readonly db: RawSqlClient,
    private readonly lockTimeoutSec = 60,
  ) {}

  claimBatch(limit: number) {
    return this.db.$queryRaw<OutboxRecord[]>`
      UPDATE "OutboxEvent"
      SET "lockedAt" = now(), "attempts" = "attempts" + 1
      WHERE "id" IN (
        SELECT "id" FROM "OutboxEvent"
        WHERE "publishedAt" IS NULL AND "deadAt" IS NULL
          AND "nextAttemptAt" <= now()
          AND ("lockedAt" IS NULL
               OR "lockedAt" < now() - make_interval(secs => ${this.lockTimeoutSec}))
        ORDER BY "createdAt"
        LIMIT ${limit}
        FOR UPDATE SKIP LOCKED
      )
      RETURNING *`;
  }

  async markPublished(ids: string[]) {
    await this.db.$executeRaw`
      UPDATE "OutboxEvent"
      SET "publishedAt" = now(), "lockedAt" = NULL, "lastError" = NULL
      WHERE "id" = ANY(${ids}::text[])`;
  }

  async markFailed(id: string, retryAt: Date | null, error: string) {
    const msg = error.slice(0, 1000);
    if (retryAt === null) {
      await this.db.$executeRaw`
        UPDATE "OutboxEvent" SET "lockedAt" = NULL, "deadAt" = now(), "lastError" = ${msg}
        WHERE "id" = ${id}`;
    } else {
      await this.db.$executeRaw`
        UPDATE "OutboxEvent" SET "lockedAt" = NULL, "nextAttemptAt" = ${retryAt}, "lastError" = ${msg}
        WHERE "id" = ${id}`;
    }
  }
}
