import { OutboxWorkerOptions } from "./outbox.types.js";

export const defaultOptions: OutboxWorkerOptions = {
  batchSize: 50,
  idleMs: 500,
  maxAttempts: 20,
  backoffMs: (n) => Math.min(2 ** n * 1000, 300_000) * (0.5 + Math.random() / 2),
};
