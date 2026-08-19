import { createHash, randomBytes } from "crypto";
import { FastifyInstance } from "fastify";

import { resetTokenConfig } from "./reset-token.config";
import { InvalidResetTokenError } from "./reset-token.errors";

export class ResetTokenService {
  constructor(private readonly app: FastifyInstance) {}

  async createResetToken(userId: string) {
    const token = this.generateResetToken();
    const tokenHash = this.hashResetToken(token);

    await this.app.redis.set(`password-reset:${tokenHash}`, userId, {
      EX: resetTokenConfig.timeLimit,
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
      .update(token + resetTokenConfig.secretPhrase)
      .digest("hex");
  }
}
