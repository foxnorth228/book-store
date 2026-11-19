import amqplib, {
  Channel,
  ChannelModel,
  ConfirmChannel,
  ConsumeMessage,
  Options,
  Replies,
} from "amqplib";

export interface RabbitClientOptions {
  url: string;
  onError?: (error: unknown) => void;
  prefetch?: number;
}

export type RabbitMessageHandler = (message: ConsumeMessage) => Promise<void> | void;

export interface SubscribeOptions extends Options.Consume {
  prefetch?: number;
}

export class UnroutableMessageError extends Error {
  constructor(public readonly messageId: string) {
    super(`Message ${messageId} was returned by the broker: no queue is bound for its routing key`);
    this.name = "UnroutableMessageError";
  }
}

export class RabbitMQClient {
  private connection?: ChannelModel;
  private publishChannel?: ConfirmChannel;
  private consumeChannel?: Channel;
  private connected = false;
  private closing = false;

  private readonly returned = new Set<string>();
  private readonly onError: (error: unknown) => void;

  constructor(private readonly options: RabbitClientOptions) {
    this.onError = options.onError ?? ((error) => console.error("[ rabbit ]", error));
  }

  async connect(): Promise<void> {
    if (this.connection) {
      throw new Error("RabbitClient is already connected.");
    }
    this.closing = false;

    const connection = await amqplib.connect(this.options.url);
    connection.on("error", (error) => this.onError(error));
    connection.on("close", () => this.handleClosed("connection"));

    try {
      const publishChannel = await connection.createConfirmChannel();
      const consumeChannel = await connection.createChannel();

      for (const channel of [publishChannel, consumeChannel]) {
        channel.on("error", (error) => this.onError(error));
        channel.on("close", () => this.handleClosed("channel"));
      }

      publishChannel.on("return", (message) => {
        const id = message.properties.messageId as string | undefined;
        if (id) this.returned.add(id);
      });

      this.connection = connection;
      this.publishChannel = publishChannel;
      this.consumeChannel = consumeChannel;
      this.connected = true;
    } catch (error) {
      await connection.close().catch(() => undefined);
      throw error;
    }
  }

  isReady(): boolean {
    return this.connected;
  }

  async close(): Promise<void> {
    this.closing = true;
    this.connected = false;

    const { publishChannel, consumeChannel, connection } = this;
    this.publishChannel = undefined;
    this.consumeChannel = undefined;
    this.connection = undefined;

    await publishChannel?.waitForConfirms().catch(() => undefined);
    await publishChannel?.close().catch(() => undefined);
    await consumeChannel?.close().catch(() => undefined);
    await connection?.close().catch(() => undefined);

    this.returned.clear();
  }

  private handleClosed(source: "connection" | "channel"): void {
    this.connected = false;
    this.returned.clear();
    if (!this.closing) {
      this.onError(new Error(`RabbitMQ ${source} closed unexpectedly`));
    }
  }

  private getPublishChannel(): ConfirmChannel {
    if (!this.publishChannel || !this.connected) {
      throw new Error("RabbitClient is not connected.");
    }
    return this.publishChannel;
  }

  private getConsumeChannel(): Channel {
    if (!this.consumeChannel || !this.connected) {
      throw new Error("RabbitClient is not connected.");
    }
    return this.consumeChannel;
  }

  private async withTopologyChannel<T>(fn: (channel: Channel) => Promise<T>): Promise<T> {
    if (!this.connection || !this.connected) {
      throw new Error("RabbitClient is not connected.");
    }
    const channel = await this.connection.createChannel();
    channel.on("error", () => undefined);
    try {
      return await fn(channel);
    } finally {
      await channel.close().catch(() => undefined);
    }
  }

  assertExchange(
    exchange: string,
    type: "direct" | "topic" | "fanout" | "headers",
    options?: Options.AssertExchange,
  ): Promise<Replies.AssertExchange> {
    return this.withTopologyChannel((ch) =>
      ch.assertExchange(exchange, type, { durable: true, ...options }),
    );
  }

  checkQueue(queue: string): Promise<Replies.AssertQueue> {
    return this.withTopologyChannel((ch) => ch.checkQueue(queue));
  }

  assertQueue(queue: string, options?: Options.AssertQueue): Promise<Replies.AssertQueue> {
    return this.withTopologyChannel((ch) => ch.assertQueue(queue, { durable: true, ...options }));
  }

  bindQueue(
    queue: string,
    exchange: string,
    routingKey: string,
    args?: Record<string, unknown>,
  ): Promise<Replies.Empty> {
    return this.withTopologyChannel((ch) => ch.bindQueue(queue, exchange, routingKey, args));
  }

  purgeQueue(queue: string): Promise<Replies.PurgeQueue> {
    return this.withTopologyChannel((ch) => ch.purgeQueue(queue));
  }

  deleteQueue(queue: string): Promise<Replies.DeleteQueue> {
    return this.withTopologyChannel((ch) => ch.deleteQueue(queue));
  }

  deleteExchange(exchange: string): Promise<Replies.Empty> {
    return this.withTopologyChannel((ch) => ch.deleteExchange(exchange));
  }

  publish<T>(
    exchange: string,
    routingKey: string,
    message: T,
    options?: Options.Publish,
  ): Promise<void> {
    const channel = this.getPublishChannel();
    const messageId = options?.messageId as string | undefined;

    return new Promise<void>((resolve, reject) => {
      channel.publish(
        exchange,
        routingKey,
        Buffer.from(JSON.stringify(message)),
        {
          contentType: "application/json",
          persistent: true,
          mandatory: true,
          ...options,
        },
        (error) => {
          if (error) {
            reject(error);
            return;
          }
          if (messageId && this.returned.delete(messageId)) {
            reject(new UnroutableMessageError(messageId));
            return;
          }
          resolve();
        },
      );
    });
  }

  async subscribe(
    queue: string,
    handler: RabbitMessageHandler,
    options: SubscribeOptions = {},
  ): Promise<Replies.Consume> {
    const channel = this.getConsumeChannel();
    const { prefetch = this.options.prefetch ?? 10, ...consumeOptions } = options;

    await channel.prefetch(prefetch);

    return channel.consume(
      queue,
      async (message) => {
        if (!message) {
          this.onError(new Error(`Consumer on queue "${queue}" was cancelled by the broker`));
          return;
        }

        try {
          await handler(message);
          channel.ack(message);
        } catch (error) {
          this.onError(error);
          try {
            channel.nack(message, false, !message.fields.redelivered);
          } catch (nackError) {
            this.onError(nackError);
          }
        }
      },
      consumeOptions,
    );
  }

  cancel(consumerTag: string): Promise<Replies.Empty> {
    return this.getConsumeChannel().cancel(consumerTag);
  }
}
