import { FastifyInstance } from "fastify";

export default async function (fastify: FastifyInstance) {
  fastify.get(
    "/health",
    {
      schema: {
        tags: ["Health"],
        response: {
          200: {
            type: "object",
            properties: {
              ok: { type: "boolean" },
            },
          },
        },
      },
    },
    async () => {
      return { ok: true };
    },
  );
}
