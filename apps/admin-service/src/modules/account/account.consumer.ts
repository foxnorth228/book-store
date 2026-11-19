import { AuthEvents, AdminEvents } from "@org/contracts";
import { FastifyInstance } from "fastify";

import { accountConfig } from "./account.config";
import { AccountService } from "./account.service";
import { authAdminUserUpdatedSchema } from "../../../../../packages/contracts/src/auth/auth.schemas";

export async function registerProfileConsumers(app: FastifyInstance) {
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
    AuthEvents.registered.route,
  );

  await app.rabbitmq.subscribe(AdminEvents.auth.queue, async (message) => {
    if (message.fields.routingKey !== AuthEvents.registered.route) {
      throw new Error(`Unexpected routing key: ${message.fields.routingKey}`);
    }

    const content = await authAdminUserUpdatedSchema.parseAsync(
      JSON.parse(message.content.toString()),
    );

    return content;
  });
}
