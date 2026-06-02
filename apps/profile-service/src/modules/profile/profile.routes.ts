import { createProfileSchema, profileParamsSchema, profileResponseSchema } from "@org/contracts";
import { FastifyInstance } from "fastify";
import z from "zod";

import { ProfileService } from "./profile.service";

const service = new ProfileService();

console.log(z.toJSONSchema(profileResponseSchema, { target: "draft-07" }));

export default async function (fastify: FastifyInstance) {
  fastify.get(
    "/profile/:id",
    {
      schema: {
        tags: ["Profile"],
        summary: "Get user profile",
        description: "Retrieve the profile information for the authenticated user",
        // params: z.toJSONSchema(profileParamsSchema, { target: "draft-2020-12" }),
        // response: {
        //   200: {
        //     value: z.toJSONSchema(profileResponseSchema, { target: "draft-2020-12" }),
        //   },
        // },
      },
    },
    async (req, reply) => {
      const { id } = req.params as { id: string };

      const profile = service.getProfile(id);

      if (!profile) {
        return reply.code(404).send({ message: "Profile not found" });
      }

      return profileParamsSchema.parse(profile);
    },
  );

  fastify.post(
    "/create-profile",
    {
      schema: {
        tags: ["Profile"],
        summary: "Create profile",
        // body: z.toJSONSchema(createProfileSchema),
        // response: {
        //   200: z.toJSONSchema(profileResponseSchema),
        // },
      },
    },
    async (req, reply) => {
      const parseResult = createProfileSchema.safeParse(req.body);

      if (!parseResult.success) {
        return reply.code(400).send({
          message: "Invalid request body",
          errors: z.treeifyError(parseResult.error),
        });
      }

      return service.createProfile(parseResult.data);
    },
  );
}
