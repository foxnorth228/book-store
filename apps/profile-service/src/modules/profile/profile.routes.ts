import { profileContracts } from "@org/contracts";
import { FastifyInstance } from "fastify";

import { profileConfig } from "./profile.config";
import { ProfileController } from "./profile.controller";

export async function profileRoutes(module: FastifyInstance) {
  const profileController = module.getDecorator<ProfileController>(profileConfig.controllerName);

  module.route({
    method: profileContracts.me.method,
    url: profileContracts.me.path,
    schema: {
      tags: [profileConfig.tags.profile],
      200: module.getSchema(profileConfig.schemas.myProfileRes),
    },
    preHandler: [module.authenticate],
    handler: (request) => {
      return profileController.getMyProfile(request);
    },
  });
}
