import fp from "fastify-plugin";
import { RedisClientType } from "redis";

interface CreateRedisPluginOptions {
  decoratorName: string;
  client: RedisClientType;
}

export function createRedisPlugin({ decoratorName = "redis", client }: CreateRedisPluginOptions) {
  return fp(
    async (app) => {
      if (app.hasDecorator(decoratorName)) {
        app.log.warn(`Decorator "${decoratorName}" already registered, skipping.`);
        return;
      }

      client.on("error", (err) => {
        app.log.error(err, "Redis error");
      });

      await client.connect();

      app.decorate(decoratorName, client);

      app.addHook("onClose", () => {
        client.destroy();
      });
    },
    { name: "prisma", fastify: "5.x" },
  );
}

declare module "fastify" {
  interface FastifyInstance {
    redis: RedisClientType;
  }
}
