import { BaseController } from "@org/fastify";

import { verificationConfig } from "./verification.config";
import { VerificationService } from "./verification.service";

export class VerificationController extends BaseController<VerificationService> {
  protected override serviceKey = verificationConfig.serviceName;

  requestOtpCode() {}
  verifyOtpCode() {}
  updatePassword() {}
}
