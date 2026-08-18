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
import { NotFoundError } from "@org/errors";
import { ResetTokenService } from "./reset-token/reset-token.service";
import { hashPassword } from "@org/shared";

export class VerificationService extends BaseService<VerificationRepository> {
  protected readonly repositoryKey = verificationConfig.repositoryName;

  constructor(
    app: FastifyInstance,
    private readonly otpService = new OtpService(app),
    private readonly resetTokenService = new ResetTokenService(app),
  ) {
    super(app);
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

  async verifyPasswordResetOtpCode(otpCode: string, email: string) {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    await this.otpService.verifyOTPCode(
      otpCode,
      VerificationOTPCodePurpose.PasswordUpdate,
      user.id,
    );

    return await this.resetTokenService.createResetToken(user.id);
  }

  async updateUserPassword(resetToken: string, password: string) {
    const userId = await this.resetTokenService.consumeResetToken(resetToken);

    const passwordHash = await hashPassword(password);

    await this.repository.updateUserPassword(userId, passwordHash);
  }
}
