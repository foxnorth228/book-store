import { authContracts, zodToJsonSchema } from "@org/contracts";
import { errorBodySchema } from "@org/errors";
import { FastifyInstance } from "fastify";

import { verificationConfig } from "./verification.config";
import { VerificationController } from "./verification.controller";

export async function verificationRoutes(module: FastifyInstance) {
  const verificationController = module.getDecorator<VerificationController>(
    verificationConfig.controllerName,
  );

  module.route({
    method: authContracts.passwordReset.requestOtpCode.method,
    url: `${authContracts.passwordReset.prefix}${authContracts.passwordReset.requestOtpCode.path}`,
    schema: {
      tags: [verificationConfig.tags.passwordUpdate],
      body: module.addSchema(verificationConfig.schemas.requestOtpCodeReq),
      response: {
        200: module.addSchema(verificationConfig.schemas.requestOtpCodeRes),
        400: zodToJsonSchema(errorBodySchema),
      },
    },
    handler: () => {
      return verificationController.requestOtpCode();
    },
  });

  module.route({
    method: authContracts.passwordReset.verifyOtpCode.method,
    url: `${authContracts.passwordReset.prefix}${authContracts.passwordReset.verifyOtpCode.path}`,
    schema: {
      tags: [verificationConfig.tags.passwordUpdate],
      body: module.addSchema(verificationConfig.schemas.verifyOtpCodeReq),
      response: {
        200: module.addSchema(verificationConfig.schemas.verifyOtpCodeRes),
        400: zodToJsonSchema(errorBodySchema),
      },
    },
    handler: () => {
      return verificationController.verifyOtpCode();
    },
  });

  module.route({
    method: authContracts.passwordReset.updatePassword.method,
    url: `${authContracts.passwordReset.prefix}${authContracts.passwordReset.updatePassword.path}`,
    schema: {
      tags: [verificationConfig.tags.passwordUpdate],
      body: module.addSchema(verificationConfig.schemas.updatePasswordReq),
      response: {
        200: module.addSchema(verificationConfig.schemas.updatePasswordRes),
        400: zodToJsonSchema(errorBodySchema),
      },
    },
    handler: () => {
      return verificationController.updatePassword();
    },
  });
}
