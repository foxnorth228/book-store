import { authContracts, zodToJsonSchema } from "@org/contracts";

import { verificationConfig } from "./verification.config";

export const verificationRequestOptCodeReq = {
  $id: verificationConfig.schemas.requestOtpCodeReq,
  ...zodToJsonSchema(authContracts.passwordReset.requestOtpCode.body),
};

export const verificationRequestOptCodeRes = {
  $id: verificationConfig.schemas.requestOtpCodeRes,
  ...zodToJsonSchema(authContracts.passwordReset.requestOtpCode.response),
};

export const verificationVerifyOptCodeReq = {
  $id: verificationConfig.schemas.verifyOtpCodeReq,
  ...zodToJsonSchema(authContracts.passwordReset.verifyOtpCode.body),
};

export const verificationVerifyOptCodeRes = {
  $id: verificationConfig.schemas.verifyOtpCodeRes,
  ...zodToJsonSchema(authContracts.passwordReset.verifyOtpCode.response),
};

export const verificationUpdatePasswordReq = {
  $id: verificationConfig.schemas.updatePasswordReq,
  ...zodToJsonSchema(authContracts.passwordReset.updatePassword.body),
};

export const verificationUpdatePasswordRes = {
  $id: verificationConfig.schemas.updatePasswordRes,
  ...zodToJsonSchema(authContracts.passwordReset.updatePassword.response),
};

export const verificationSchemas = [
  verificationRequestOptCodeReq,
  verificationRequestOptCodeRes,
  verificationVerifyOptCodeReq,
  verificationVerifyOptCodeRes,
  verificationUpdatePasswordReq,
  verificationUpdatePasswordRes,
];
