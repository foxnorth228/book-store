import { NotificationAuthSendOtpCodeEventDTO, NotificationEvents } from "@org/contracts";
import { FastifyInstance } from "fastify";

import { emailsConfig } from "./emails.config";
import { EmailsService } from "./emails.service";

export async function registerEmailsConsumers(app: FastifyInstance) {
  const service = app.getDecorator<EmailsService>(emailsConfig.serviceName);

  await app.rabbitmq.subscribe(
    NotificationEvents.PasswordResetOtpRequested.queue,
    NotificationEvents.exchange,
    NotificationEvents.PasswordResetOtpRequested.routingKey,
    async (message) => {
      const content = JSON.parse(message.content.toString()) as NotificationAuthSendOtpCodeEventDTO;

      await service.sendEmailPasswordResetOtp(content);
    },
  );
}
