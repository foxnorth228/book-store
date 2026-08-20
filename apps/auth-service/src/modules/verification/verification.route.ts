import {
  authContracts,
  VerificationRequestOtpCodeReq,
  VerificationUpdatePasswordReq,
  VerificationVerifyOtpCodeReq,
  zodToJsonSchema,
} from "@org/contracts";
import { BadRequestError, errorBodySchema } from "@org/errors";
import { FastifyInstance, FastifyRequest } from "fastify";

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
      body: module.getSchema(verificationConfig.schemas.requestOtpCodeReq),
      response: {
        200: module.getSchema(verificationConfig.schemas.requestOtpCodeRes),
        400: zodToJsonSchema(errorBodySchema),
      },
    },
    handler: (request: FastifyRequest<{ Body: VerificationRequestOtpCodeReq }>) => {
      return verificationController.requestOtpCode(request);
    },
  });

  module.route({
    method: authContracts.passwordReset.verifyOtpCode.method,
    url: `${authContracts.passwordReset.prefix}${authContracts.passwordReset.verifyOtpCode.path}`,
    schema: {
      tags: [verificationConfig.tags.passwordUpdate],
      body: module.getSchema(verificationConfig.schemas.verifyOtpCodeReq),
      response: {
        200: module.getSchema(verificationConfig.schemas.verifyOtpCodeRes),
        400: zodToJsonSchema(errorBodySchema),
      },
    },
    handler: (request: FastifyRequest<{ Body: VerificationVerifyOtpCodeReq }>) => {
      return verificationController.verifyOtpCode(request);
    },
  });

  module.route({
    method: authContracts.passwordReset.updatePassword.method,
    url: `${authContracts.passwordReset.prefix}${authContracts.passwordReset.updatePassword.path}`,
    schema: {
      tags: [verificationConfig.tags.passwordUpdate],
      body: module.getSchema(verificationConfig.schemas.updatePasswordReq),
      response: {
        200: module.getSchema(verificationConfig.schemas.updatePasswordRes),
        400: zodToJsonSchema(errorBodySchema),
      },
    },
    preHandler: async (request) => {
      const data = request.body;
      const result = await authContracts.passwordReset.updatePassword.body.safeParseAsync(data);

      if (!result.success) {
        throw new BadRequestError("Incorrect data");
      }

      return;
    },
    handler: (request: FastifyRequest<{ Body: VerificationUpdatePasswordReq }>) => {
      return verificationController.updatePassword(request);
    },
  });
}
