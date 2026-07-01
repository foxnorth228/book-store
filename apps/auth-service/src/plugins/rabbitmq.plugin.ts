import { RabbitMQClient } from "@org/rabbitmq";
import { getRabbitmqUrlByConfig } from "@org/shared";
import fp from "fastify-plugin";

const rabbitmqPlugin = fp(async (app) => {
  const rabbitmqUrl = getRabbitmqUrlByConfig(app.config.env);
  const rabbitmqClient = new RabbitMQClient({ url: rabbitmqUrl });
  app.decorate("rabbitmq", rabbitmqClient);
});

declare module "fastify" {
  interface FastifyInstance {
    rabbitmq: RabbitMQClient;
  }
}

export default rabbitmqPlugin;
