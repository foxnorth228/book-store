import { VerificationRequestOtpCodeReq } from "@org/contracts";
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
  verifyOtpCode() {}
  updatePassword() {}
}
