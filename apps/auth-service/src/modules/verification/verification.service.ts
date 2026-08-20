import {
  authContractConfig,
  NotificationAuthSendOtpCodeEventDTO,
  NotificationEvents,
  VerificationOTPCodePurpose,
} from "@org/contracts";
import { NotFoundError } from "@org/errors";
import { BaseService } from "@org/fastify";
import { hashPassword } from "@org/shared";
import { FastifyInstance } from "fastify";

import { OTPResendTooSoonError } from "./otp/otp.errors";
import { OtpService } from "./otp/otp.service";
import { ResetTokenService } from "./reset-token/reset-token.service";
import { verificationConfig } from "./verification.config";
import { VerificationRepository } from "./verification.repository";

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

    const retryAfter = await this.otpService.acquireResendCooldown(
      VerificationOTPCodePurpose.PasswordUpdate,
      user.id,
    );

    if (retryAfter !== null) {
      throw new OTPResendTooSoonError("OTP resend is temporarily unavailable", retryAfter);
    }

    try {
      const code = await this.otpService.createOTPCode(
        VerificationOTPCodePurpose.PasswordUpdate,
        user.id,
        authContractConfig.passwordOtpCode.length,
      );

      await this.app.rabbitmq.publish<NotificationAuthSendOtpCodeEventDTO>(
        NotificationEvents.exchange,
        NotificationEvents.PasswordResetOtpRequested.routingKey,
        {
          email: user.email,
          code: code,
        },
      );
    } catch (e) {
      await this.otpService.releaseResendCooldown(
        VerificationOTPCodePurpose.PasswordUpdate,
        user.id,
      );

      throw e;
    }
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
