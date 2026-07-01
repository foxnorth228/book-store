import { createRedisPlugin } from "@org/fastify-plugins";
import { getRedisUrlByConfig } from "@org/shared";
import fp from "fastify-plugin";
import { createClient } from "redis";

const redisPlugin = fp(async (app) => {
  const config = app.config.env;

  const redisClient = createClient({
    url: getRedisUrlByConfig(config),
  });

  app.register(createRedisPlugin({ decoratorName: "redis", client: redisClient }));
});

export default redisPlugin;
