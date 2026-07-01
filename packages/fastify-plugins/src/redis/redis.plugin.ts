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

      try {
        await client.connect();
      } catch (err) {
        app.log.error(err, "Redis connection error");
        return;
      }

      app.decorate(decoratorName, client);

      app.addHook("onClose", () => {
        client.destroy();
      });
    },
    { name: "redis", fastify: "5.x" },
  );
}
