import { createRedisPlugin } from "@org/fastify-plugins";
import { getRedisUrlByConfig } from "@org/shared";
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { createClient, RedisClientType } from "redis";

const redisPlugin = fp(
  async (app: FastifyInstance) => {
    const config = app.config.env;

    const redisClient = createClient({
      url: getRedisUrlByConfig(config),
      socket: {
        reconnectStrategy: false,
        connectTimeout: 5000,
      },
    });

    await app.register(createRedisPlugin({ decoratorName: "redis", client: redisClient }));
  },
  { name: "redis-app" },
);

declare module "fastify" {
  interface FastifyInstance {
    redis: RedisClientType;
  }
}

export default redisPlugin;
