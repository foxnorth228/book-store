import { VerificationOTPCodePurpose } from "@org/contracts";
import { createHash, randomInt } from "crypto";
import { FastifyInstance } from "fastify";

import { otpConfig } from "./otp.config";
import { InvalidOTPCodeError, OTPCodeExpiredError } from "./otp.errors";

export class OtpService {
  constructor(private readonly app: FastifyInstance) {}

  async createOTPCode(purpose: VerificationOTPCodePurpose, userId: string) {
    const newOTPCode = this.generateOTPCode();

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
}
