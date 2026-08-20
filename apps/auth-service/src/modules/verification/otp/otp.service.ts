import { authContractConfig, VerificationOTPCodePurpose } from "@org/contracts";
import { createHash, randomInt } from "crypto";
import { FastifyInstance } from "fastify";

import { otpConfig } from "./otp.config";
import { InvalidOTPCodeError, OTPCodeExpiredError } from "./otp.errors";

export class OtpService {
  constructor(private readonly app: FastifyInstance) {}

  async createOTPCode(purpose: VerificationOTPCodePurpose, userId: string, length?: number) {
    const newOTPCode = this.generateOTPCode(length);

    const otpCodeKey = this.getOTPRedisKey(purpose, userId);

    await this.app.redis.hSet(otpCodeKey, {
      codeHash: this.getHashedOTPCode(newOTPCode),
      attempts: 0,
    });

    await this.app.redis.expire(otpCodeKey, otpConfig.codeTimeLimit);

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
      if (attempts >= otpConfig.maxVerifyRetriesCount) {
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
      .update(otpCode + otpConfig.secretPhrase)
      .digest("hex");
  }

  generateOTPCode(length = 6) {
    const max = 10 ** length;

    return randomInt(0, max).toString().padStart(length, "0");
  }

  async acquireResendCooldown(
    purpose: VerificationOTPCodePurpose,
    userId: string,
  ): Promise<number | null> {
    const key = this.getResendCooldownKey(purpose, userId);

    const result = await this.app.redis.set(key, "1", {
      condition: "NX",
      expiration: { type: "EX", value: authContractConfig.passwordOtpCode.resendCooldown },
    });

    if (result === "OK") {
      return null;
    }

    return Math.max(await this.app.redis.ttl(key), 0);
  }

  async releaseResendCooldown(purpose: VerificationOTPCodePurpose, userId: string): Promise<void> {
    await this.app.redis.del(this.getResendCooldownKey(purpose, userId));
  }

  private getResendCooldownKey(purpose: VerificationOTPCodePurpose, userId: string) {
    return `otp:resend:${purpose}:${userId}`;
  }
}
