import { profileParamsSchema } from "@org/contracts";
import { FastifyInstance } from "fastify";

import { profileConfig } from "./profile.config";
import { ProfileService } from "./profile.service";

export async function profileRoutes(module: FastifyInstance) {
  const profileService = module.getDecorator<ProfileService>(profileConfig.serviceName);

  module.get(
    "/profile/:id",
    {
      schema: {
        tags: ["Profile"],
        summary: "Get user profile",
        description: "Retrieve the profile information for the authenticated user",
      },
    },
    async (req, reply) => {
      const { id } = req.params as { id: string };

      const profile = profileService.getProfile(id);

      if (!profile) {
        return reply.code(404).send({ message: "Profile not found" });
      }

      return profileParamsSchema.parse(profile);
    },
  );
}
