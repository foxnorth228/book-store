import fp from "fastify-plugin";
import { OutboxWorker } from "./outbox.worker.js";
import { OutboxPublisher, OutboxStore, OutboxWorkerOptions } from "./outbox.types.js";
import { defaultOptions } from "./outbox.config.js";

declare module "fastify" {
  interface FastifyInstance {
    outbox: OutboxWorker;
  }
}

export interface OutboxPluginOptions {
  store: OutboxStore;
  publisher: OutboxPublisher;
  worker?: Partial<OutboxWorkerOptions>;
  autoStart?: boolean;
}

export const outboxPlugin = fp<OutboxPluginOptions>(
  async (app, opts) => {
    const worker = new OutboxWorker(opts.store, opts.publisher, app.log, {
      ...defaultOptions,
      ...opts.worker,
    });

    app.decorate("outbox", worker);

    if (opts.autoStart ?? true) {
      app.addHook("onReady", async () => worker.start());
    }
    app.addHook("onClose", async () => worker.stop());
  },
  { name: "outbox" },
);
