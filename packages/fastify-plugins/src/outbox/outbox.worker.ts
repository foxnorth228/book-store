import { defaultOptions } from "./outbox.config.js";
import {
  OutboxLogger,
  OutboxPublisher,
  OutboxRecord,
  OutboxStore,
  OutboxWorkerOptions,
} from "./outbox.types.js";

export class OutboxWorker {
  private running = false;
  private loop?: Promise<void>;
  private wake?: () => void;

  constructor(
    private readonly store: OutboxStore,
    private readonly publisher: OutboxPublisher,
    private readonly log: OutboxLogger,
    private readonly opts: OutboxWorkerOptions = defaultOptions,
  ) {}

  start(): void {
    if (this.running) return;
    this.running = true;
    this.loop = this.run();
  }

  async stop(): Promise<void> {
    this.running = false;
    this.wake?.();
    await this.loop;
  }

  poke(): void {
    this.wake?.();
  }

  private async run(): Promise<void> {
    while (this.running) {
      let batch: OutboxRecord[];
      try {
        batch = await this.store.claimBatch(this.opts.batchSize);
      } catch (err) {
        this.log.error({ err }, "outbox claim failed");
        await this.idle(this.opts.idleMs);
        continue;
      }

      if (batch.length === 0) {
        await this.idle(this.opts.idleMs);
        continue;
      }

      await this.process(batch);
    }
  }

  private async process(batch: OutboxRecord[]): Promise<void> {
    const results = await Promise.allSettled(batch.map((r) => this.publisher.publish(r)));

    const published: string[] = [];
    for (const [i, result] of results.entries()) {
      const record = batch[i];
      if (result.status === "fulfilled") {
        published.push(record.id);
        continue;
      }
      const dead = record.attempts >= this.opts.maxAttempts;
      const retryAt = dead ? null : new Date(Date.now() + this.opts.backoffMs(record.attempts));
      this.log.warn({ err: result.reason, eventId: record.id, dead }, "outbox publish failed");
      try {
        await this.store.markFailed(
          record.id,
          retryAt,
          String(result.reason?.message ?? result.reason),
        );
      } catch (err) {
        this.log.error({ err, eventId: record.id }, "outbox markFailed failed");
      }
    }

    if (published.length > 0) {
      try {
        await this.store.markPublished(published);
      } catch (err) {
        this.log.error({ err }, "outbox markPublished failed");
      }
    }
  }

  private idle(ms: number): Promise<void> {
    return new Promise((resolve) => {
      const t = setTimeout(resolve, ms);
      this.wake = () => {
        clearTimeout(t);
        resolve();
      };
    });
  }
}
