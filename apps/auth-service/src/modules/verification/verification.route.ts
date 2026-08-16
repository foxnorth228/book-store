import { FastifyInstance } from "fastify";

import { verificationConfig } from "./verification.config";
import { VerificationController } from "./verification.controller";

export async function verificationRoutes(module: FastifyInstance) {
  const verificationController = module.getDecorator<VerificationController>(
    verificationConfig.controllerName,
  );
  console.log(verificationController);
}
