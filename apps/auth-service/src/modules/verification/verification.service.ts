import {
  NotificationAuthSendOtpCodeEventDTO,
  NotificationEvents,
  VerificationOTPCodePurpose,
} from "@org/contracts";

import { BaseService } from "@org/fastify";
import { createHash, randomBytes, randomInt } from "crypto";

import { verificationConfig } from "./verification.config";
import {
  InvalidOTPCodeError,
  InvalidResetTokenError,
  OTPCodeExpiredError,
} from "./verification.errors";
import { VerificationRepository } from "./verification.repository";

export class VerificationService extends BaseService<VerificationRepository> {
  protected readonly repositoryKey = verificationConfig.repositoryName;

  async processRequestOtpCode(email: string) {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      return;
    }

    const code = await this.createOTPCode(VerificationOTPCodePurpose.PasswordUpdate, user.id);

    await this.app.rabbitmq.publish<NotificationAuthSendOtpCodeEventDTO>(
      NotificationEvents.exchange,
      NotificationEvents.PasswordResetOtpRequested.routingKey,
      {
        email: user.email,
        code: code,
      },
    );
  }

  async createOTPCode(purpose: VerificationOTPCodePurpose, userId: string) {
    const newOTPCode = this.generateOTPCode();

    const otpCodeKey = this.getOTPRedisKey(purpose, userId);

    await this.app.redis.hSet(otpCodeKey, {
      codeHash: this.getHashedOTPCode(newOTPCode),
      attempts: 0,
    });

    await this.app.redis.expire(otpCodeKey, verificationConfig.otp.codeTimeLimit);

    return newOTPCode;
  }

  async verifyOTPCode(
    externalOtpCode: string,
    purpose: VerificationOTPCodePurpose,
    userId: string,
  ) {
    const currentOtpCodeKey = this.getOTPRedisKey(purpose, userId);

    const currentOtpCodeHash = await this.app.redis.hGet(currentOtpCodeKey, "codeHash");
    if (!currentOtpCodeHash) {
      throw new OTPCodeExpiredError("OTP code is expired");
    }

    const externalOtpCodeHash = this.getHashedOTPCode(externalOtpCode);
    if (externalOtpCodeHash !== currentOtpCodeHash) {
      const attempts = await this.app.redis.hIncrBy(currentOtpCodeKey, "attempts", 1);
      if (attempts >= verificationConfig.otp.maxVerifyRetriesCount) {
        await this.deleteOTPCode(purpose, userId);

        throw new OTPCodeExpiredError("Too many incorrect OTP attempts");
      }
      throw new InvalidOTPCodeError("Incorrect OTP code");
    }

    await this.deleteOTPCode(purpose, userId);
  }

  async deleteOTPCode(purpose: VerificationOTPCodePurpose, userId: string) {
    return await this.app.redis.del(this.getOTPRedisKey(purpose, userId));
  }

  getOTPRedisKey(purpose: VerificationOTPCodePurpose, userId: string) {
    return `otp:${purpose}:${userId}`;
  }

  getHashedOTPCode(otpCode: string) {
    return createHash("sha256")
      .update(otpCode + verificationConfig.otp.secretPhrase)
      .digest("hex");
  }

  generateOTPCode(length = 6) {
    const max = 10 ** length;

    return randomInt(0, max).toString().padStart(length, "0");
  }

  async createResetToken(userId: string) {
    const token = this.generateResetToken();
    const tokenHash = this.hashResetToken(token);

    await this.app.redis.set(`password-reset:${tokenHash}`, userId, {
      EX: verificationConfig.resetToken.timeLimit,
    });

    return token;
  }

  async consumeResetToken(token: string) {
    const tokenHash = this.hashResetToken(token);
    const key = this.getResetTokenRedisKey(tokenHash);

    const userId = await this.app.redis.get(key);

    if (!userId) {
      throw new InvalidResetTokenError("Reset token is invalid or expired");
    }

    await this.app.redis.del(key);

    return userId;
  }

  getResetTokenRedisKey(tokenHash: string) {
    return `password-reset:${tokenHash}`;
  }

  generateResetToken() {
    return randomBytes(32).toString("base64url");
  }

  hashResetToken(token: string) {
    return createHash("sha256")
      .update(token + verificationConfig.resetToken.secretPhrase)
      .digest("hex");
  }
}
