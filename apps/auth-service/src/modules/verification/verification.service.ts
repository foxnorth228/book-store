import { VerificationOTPCodePurpose } from "@org/contracts";
import { BaseService } from "@org/fastify";
import { createHash, randomInt } from "crypto";

import { verificationConfig } from "./verification.config";
import { InvalidOTPCodeError, OTPCodeExpiredError } from "./verification.errors";
import { VerificationRepository } from "./verification.repository";

export class VerificationService extends BaseService<VerificationRepository> {
  protected readonly repositoryKey = verificationConfig.repositoryName;

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
}
