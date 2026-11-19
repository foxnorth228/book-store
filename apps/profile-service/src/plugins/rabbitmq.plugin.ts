import { RabbitMQClient } from "@org/rabbitmq";
import { getRabbitmqUrlByConfig } from "@org/shared";
import fp from "fastify-plugin";

const rabbitmqPlugin = fp(
  async (app) => {
    const client = new RabbitMQClient({
      url: getRabbitmqUrlByConfig(app.config.env),
      onError: (err) => app.log.error({ err }, "rabbitmq error"),
    });
    await client.connect();
    app.decorate("rabbitmq", client);
    app.addHook("onClose", async () => client.close());
  },
  { name: "rabbitmq" },
);

declare module "fastify" {
  interface FastifyInstance {
    rabbitmq: RabbitMQClient;
  }
}

export default rabbitmqPlugin;
