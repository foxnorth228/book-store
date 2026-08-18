import {
  NotificationAuthSendOtpCodeEventDTO,
  NotificationEvents,
  VerificationOTPCodePurpose,
} from "@org/contracts";

import { BaseService } from "@org/fastify";

import { verificationConfig } from "./verification.config";
import { VerificationRepository } from "./verification.repository";
import { FastifyInstance } from "fastify";
import { OtpService } from "./otp/otp.service";

export class VerificationService extends BaseService<VerificationRepository> {
  protected readonly repositoryKey = verificationConfig.repositoryName;

  constructor(
    app: FastifyInstance,
    private readonly otpService = new OtpService(app),
  ) {
    super(app);
  }

  async verifyPasswordResetOtpCode(otpCode: string, email: string) {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      return;
    }

    await this.otpService.verifyOTPCode(
      otpCode,
      VerificationOTPCodePurpose.PasswordUpdate,
      user.id,
    );
  }

  async processRequestOtpCode(email: string) {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      return;
    }

    const code = await this.otpService.createOTPCode(
      VerificationOTPCodePurpose.PasswordUpdate,
      user.id,
    );

    await this.app.rabbitmq.publish<NotificationAuthSendOtpCodeEventDTO>(
      NotificationEvents.exchange,
      NotificationEvents.PasswordResetOtpRequested.routingKey,
      {
        email: user.email,
        code: code,
      },
    );
  }
}
