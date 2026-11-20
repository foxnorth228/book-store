import {
  AuthEvents,
  AdminEvents,
  ProfileEvents,
  profileAdminUpdatedSchema,
  authAdminUserUpdatedSchema,
} from "@org/contracts";
import { FastifyInstance } from "fastify";

import { accountConfig } from "./account.config";
import { AccountService } from "./account.service";

export async function registerAuthConsumers(app: FastifyInstance) {
  const service = app.getDecorator<AccountService>(accountConfig.serviceName);

  await app.rabbitmq.assertExchange(AuthEvents.dlxKey, "fanout");
  await app.rabbitmq.assertQueue(AdminEvents.dlqKey);
  await app.rabbitmq.bindQueue(AdminEvents.dlqKey, AuthEvents.dlxKey, "");

  await app.rabbitmq.assertExchange(AuthEvents.exchangeKey, "direct");
  await app.rabbitmq.assertQueue(AdminEvents.auth.queue, {
    deadLetterExchange: AuthEvents.dlxKey,
  });
  await app.rabbitmq.bindQueue(
    AdminEvents.auth.queue,
    AuthEvents.exchangeKey,
    AuthEvents.adminUserUpdated.route,
  );

  await app.rabbitmq.subscribe(AdminEvents.auth.queue, async (message) => {
    if (message.fields.routingKey !== AuthEvents.adminUserUpdated.route) {
      throw new Error(`Unexpected routing key: ${message.fields.routingKey}`);
    }

    const content = await authAdminUserUpdatedSchema.parseAsync(
      JSON.parse(message.content.toString()),
    );
    await service.applyAccountSnapshots([content]);
  });
}

export async function registerProfileConsumers(app: FastifyInstance) {
  const service = app.getDecorator<AccountService>(accountConfig.serviceName);

  await app.rabbitmq.assertExchange(ProfileEvents.dlxKey, "fanout");
  await app.rabbitmq.assertQueue(AdminEvents.dlqKey);
  await app.rabbitmq.bindQueue(AdminEvents.dlqKey, ProfileEvents.dlxKey, "");

  await app.rabbitmq.assertExchange(ProfileEvents.exchangeKey, "direct");
  await app.rabbitmq.assertQueue(AdminEvents.profile.queue, {
    deadLetterExchange: ProfileEvents.dlxKey,
  });
  await app.rabbitmq.bindQueue(
    AdminEvents.profile.queue,
    ProfileEvents.exchangeKey,
    ProfileEvents.adminProfileUpdated.route,
  );

  await app.rabbitmq.subscribe(AdminEvents.profile.queue, async (message) => {
    if (message.fields.routingKey !== ProfileEvents.adminProfileUpdated.route) {
      throw new Error(`Unexpected routing key: ${message.fields.routingKey}`);
    }

    const content = await profileAdminUpdatedSchema.parseAsync(
      JSON.parse(message.content.toString()),
    );

    await service.applyProfileSnapshots([content]);
  });
}
