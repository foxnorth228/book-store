import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

export default fp(async function (fastify: FastifyInstance) {
  await fastify.register(swagger, {
    openapi: {
      info: {
        title: "Profile Service API",
        description: "Rifthub profile service",
        version: "1.0.0",
      },
    },
  });

  await fastify.register(swaggerUi, {
    indexPrefix: `/${fastify.config.env.PATH_PREFIX}`,
    routePrefix: "docs",
  });
});
