import { authAccountRegisteredSchema, AuthEvents, ProfileEvents } from "@org/contracts";
import { FastifyInstance } from "fastify";

import { profileConfig } from "./profile.config";
import { ProfileService } from "./profile.service";

export async function registerProfileConsumers(app: FastifyInstance) {
  const service = app.getDecorator<ProfileService>(profileConfig.serviceName);

  await app.rabbitmq.assertExchange(AuthEvents.dlxKey, "fanout");
  await app.rabbitmq.assertQueue(ProfileEvents.dlqKey);
  await app.rabbitmq.bindQueue(ProfileEvents.dlqKey, AuthEvents.dlxKey, "");

  await app.rabbitmq.assertExchange(AuthEvents.exchangeKey, "direct");
  await app.rabbitmq.assertQueue(ProfileEvents.registered.queue, {
    deadLetterExchange: AuthEvents.dlxKey,
  });
  await app.rabbitmq.bindQueue(
    ProfileEvents.registered.queue,
    AuthEvents.exchangeKey,
    AuthEvents.registered.route,
  );

  await app.rabbitmq.subscribe(ProfileEvents.registered.queue, async (message) => {
    if (message.fields.routingKey !== AuthEvents.registered.route) {
      throw new Error(`Unexpected routing key: ${message.fields.routingKey}`);
    }

    const content = await authAccountRegisteredSchema.parseAsync(
      JSON.parse(message.content.toString()),
    );

    await service.createProfile(content.accountId, content.nickname);
  });
}
