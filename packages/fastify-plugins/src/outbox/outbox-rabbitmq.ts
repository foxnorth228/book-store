import { OutboxPublisher, OutboxRecord } from "./outbox.types.js";
import { RabbitMQClient } from "@org/rabbitmq";

export class RabbitOutboxPublisher implements OutboxPublisher {
  constructor(
    private readonly client: RabbitMQClient,
    private readonly exchange: string,
  ) {}

  publish(record: OutboxRecord): Promise<void> {
    return this.client.publish(this.exchange, record.eventType, record.payload, {
      messageId: record.id,
      type: record.eventType,
      timestamp: record.createdAt.getTime(),
    });
  }
}
