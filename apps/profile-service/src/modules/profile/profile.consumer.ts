import { AuthAccountRegisteredEventDto, AuthEvents, ProfileEvents } from "@org/contracts";
import { FastifyInstance } from "fastify";

import { profileConfig } from "./profile.config";
import { ProfileService } from "./profile.service";

export async function registerProfileConsumers(app: FastifyInstance) {
  const service = app.getDecorator<ProfileService>(profileConfig.serviceName);

  await app.rabbitmq.subscribe(
    ProfileEvents.Registered.queue,
    AuthEvents.exchange,
    AuthEvents.Registered,
    async (message) => {
      const content = JSON.parse(message.content.toString()) as AuthAccountRegisteredEventDto;
      console.log(content);
      await service.createProfile(content.accountId, content.language);
    },
  );
}
