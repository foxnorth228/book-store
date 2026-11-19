export interface OutboxRecord {
  id: string;
  aggregateId: string;
  aggregateType: string;
  eventType: string;
  payload: unknown;
  createdAt: Date;
  attempts: number;
}

export interface OutboxStore {
  claimBatch(limit: number): Promise<OutboxRecord[]>;
  markPublished(ids: string[]): Promise<void>;
  markFailed(id: string, retryAt: Date | null, error: string): Promise<void>;
}

export interface OutboxPublisher {
  publish(record: OutboxRecord): Promise<void>;
}

export interface OutboxLogger {
  info(obj: object, msg?: string): void;
  warn(obj: object, msg?: string): void;
  error(obj: object, msg?: string): void;
}

export interface OutboxWorkerOptions {
  batchSize: number;
  idleMs: number;
  maxAttempts: number;
  backoffMs: (attempts: number) => number;
}
