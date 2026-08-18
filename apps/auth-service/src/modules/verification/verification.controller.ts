import {
  VerificationRequestOtpCodeReq,
  VerificationUpdatePasswordReq,
  VerificationVerifyOtpCodeReq,
} from "@org/contracts";
import { BaseController } from "@org/fastify";
import { FastifyRequest } from "fastify";

import { verificationConfig } from "./verification.config";
import { VerificationService } from "./verification.service";

export class VerificationController extends BaseController<VerificationService> {
  protected override serviceKey = verificationConfig.serviceName;

  async requestOtpCode(request: FastifyRequest<{ Body: VerificationRequestOtpCodeReq }>) {
    const email = request.body?.email;

    await this.service.processRequestOtpCode(email);

    return { success: true };
  }

  async verifyOtpCode(request: FastifyRequest<{ Body: VerificationVerifyOtpCodeReq }>) {
    const { code, email } = request.body;

    const resetToken = await this.service.verifyPasswordResetOtpCode(code, email);

    return { resetToken };
  }

  async updatePassword(request: FastifyRequest<{ Body: VerificationUpdatePasswordReq }>) {
    const { resetToken, password } = request.body;

    await this.service.updateUserPassword(resetToken, password);

    return { success: true };
  }
}
