import fp from "fastify-plugin";
import { outboxPlugin, PrismaOutboxStore, RabbitOutboxPublisher } from "@org/fastify-plugins";
import { AuthEvents } from "@org/contracts";

export default fp(
  async (app) => {
    await app.register(outboxPlugin, {
      store: new PrismaOutboxStore(app.prisma),
      publisher: new RabbitOutboxPublisher(app.rabbitmq, AuthEvents.exchangeKey),
    });
  },
  {
    name: "auth-outbox",
    dependencies: ["prisma", "rabbitmq"],
  },
);
