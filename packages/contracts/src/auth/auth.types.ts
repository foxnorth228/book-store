import { z } from "zod";

import { authContracts } from "./auth.contracts.js";
import { authAccountRegisteredSchema, authJwtPayloadSchema } from "./auth.schemas.js";

export type AuthLoginReq = z.infer<typeof authContracts.login.body>;
export type AuthLoginRes = z.infer<typeof authContracts.login.response>;

export type AuthRegisterReq = z.infer<typeof authContracts.register.body>;
export type AuthRegisterRes = z.infer<typeof authContracts.register.response>;

export type VerificationRequestOtpCodeReq = z.infer<
  typeof authContracts.passwordReset.requestOtpCode.body
>;
export type VerificationRequestOtpCodeRes = z.infer<
  typeof authContracts.passwordReset.requestOtpCode.body
>;

export type VerificationVerifyOtpCodeReq = z.infer<
  typeof authContracts.passwordReset.verifyOtpCode.body
>;

export type VerificationVerifyOtpCodeRes = z.infer<
  typeof authContracts.passwordReset.verifyOtpCode.response
>;

export type VerificationUpdatePasswordReq = z.infer<
  typeof authContracts.passwordReset.updatePassword.body
>;

export type VerificationUpdatePasswordRes = z.infer<
  typeof authContracts.passwordReset.updatePassword.response
>;

export type AuthAccountRegisteredEventDto = z.infer<typeof authAccountRegisteredSchema>;

export type AuthJwtPayloadUserDto = z.infer<typeof authJwtPayloadSchema>;

export enum VerificationOTPCodePurpose {
  EmailConfirmation = "email_confirmation",
  PasswordUpdate = "password_update",
}
