import amqplib, { ChannelModel, ConfirmChannel, ConsumeMessage, Options, Replies } from "amqplib";

export interface RabbitClientOptions {
  url: string;
}

export type RabbitMessageHandler = (message: ConsumeMessage) => Promise<void> | void;

export class RabbitMQClient {
  private connection?: ChannelModel;
  private channel?: ConfirmChannel;

  constructor(private readonly options: RabbitClientOptions) {}

  async connect(): Promise<void> {
    if (this.connection) {
      throw new Error("RabbitClient is already connected.");
    }

    this.connection = await amqplib.connect(this.options.url);
    this.channel = await this.connection.createConfirmChannel();
  }

  async close(): Promise<void> {
    await this.channel?.close();
    await this.connection?.close();

    this.channel = undefined;
    this.connection = undefined;
  }

  async assertExchange(
    exchange: string,
    type: "direct" | "topic" | "fanout" | "headers",
    options?: Options.AssertExchange,
  ): Promise<Replies.AssertExchange> {
    return this.getChannel().assertExchange(exchange, type, {
      durable: true,
      ...options,
    });
  }

  async assertQueue(queue: string, options?: Options.AssertQueue): Promise<Replies.AssertQueue> {
    return this.getChannel().assertQueue(queue, {
      durable: true,
      ...options,
    });
  }

  async bindQueue(
    queue: string,
    exchange: string,
    routingKey: string,
    args?: Record<string, unknown>,
  ): Promise<Replies.Empty> {
    return this.getChannel().bindQueue(queue, exchange, routingKey, args);
  }

  async publish<T>(
    exchange: string,
    routingKey: string,
    message: T,
    options?: Options.Publish,
  ): Promise<void> {
    const channel = this.getChannel();

    channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)), {
      contentType: "application/json",
      persistent: true,
      ...options,
    });

    await channel.waitForConfirms();
  }

  async subscribe(
    queue: string,
    handler: RabbitMessageHandler,
    options?: Options.Consume,
  ): Promise<Replies.Consume> {
    const channel = this.getChannel();

    return channel.consume(
      queue,
      async (message) => {
        if (!message) {
          return;
        }

        try {
          await handler(message);
          channel.ack(message);
        } catch (error) {
          channel.nack(message, false, true);
          throw error;
        }
      },
      options,
    );
  }

  async cancel(consumerTag: string): Promise<Replies.Empty> {
    return this.getChannel().cancel(consumerTag);
  }

  async purgeQueue(queue: string): Promise<Replies.PurgeQueue> {
    return this.getChannel().purgeQueue(queue);
  }

  async deleteQueue(queue: string): Promise<Replies.DeleteQueue> {
    return this.getChannel().deleteQueue(queue);
  }

  async deleteExchange(exchange: string): Promise<Replies.Empty> {
    return this.getChannel().deleteExchange(exchange);
  }

  private getChannel(): ConfirmChannel {
    if (!this.channel) {
      throw new Error("RabbitClient is not connected.");
    }

    return this.channel;
  }
}
