import {
  AuthEvents,
  authNotificationSendOtpCodeEventSchema,
  NotificationEvents,
} from "@org/contracts";
import { FastifyInstance } from "fastify";

import { emailsConfig } from "./emails.config";
import { EmailsService } from "./emails.service";

export async function registerEmailsConsumers(app: FastifyInstance) {
  const service = app.getDecorator<EmailsService>(emailsConfig.serviceName);

  await app.rabbitmq.assertExchange(AuthEvents.dlxKey, "fanout");
  await app.rabbitmq.assertQueue(NotificationEvents.dlqKey);
  await app.rabbitmq.bindQueue(NotificationEvents.dlqKey, AuthEvents.dlxKey, "");

  await app.rabbitmq.assertExchange(AuthEvents.exchangeKey, "direct");
  await app.rabbitmq.assertQueue(NotificationEvents.passwordResetOtpRequested.queue, {
    deadLetterExchange: AuthEvents.dlxKey,
  });
  await app.rabbitmq.bindQueue(
    NotificationEvents.passwordResetOtpRequested.queue,
    AuthEvents.exchangeKey,
    AuthEvents.passwordResetOtpRequested.route,
  );

  await app.rabbitmq.subscribe(
    NotificationEvents.passwordResetOtpRequested.queue,
    async (message) => {
      if (message.fields.routingKey !== AuthEvents.passwordResetOtpRequested.route) {
        throw new Error(`Unexpected routing key: ${message.fields.routingKey}`);
      }

      const content = await authNotificationSendOtpCodeEventSchema.parseAsync(
        JSON.parse(message.content.toString()),
      );

      await service.sendEmailPasswordResetOtp(content);
    },
  );
}
