import amqplib from "amqplib";

export class RabbitClient {
  connect(url: string) {
    return amqplib.connect(url);
  }
}
