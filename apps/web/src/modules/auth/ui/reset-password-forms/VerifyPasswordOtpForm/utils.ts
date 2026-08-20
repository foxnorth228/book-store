import { authContractConfig, AuthErrorCodes, VerificationVerifyOtpCodeReq } from "@org/contracts";
import { createZodErrorMap } from "@shared/lib";
import { TFunction } from "i18next";

export const getFormErrorMessage = (code: AuthErrorCodes, t: TFunction) => {
  switch (code) {
    case AuthErrorCodes.INVALID_OTP_CODE:
      return t((w) => w.resetPassword.verifyOtpForm.errors.invalidCode, {
        ns: "auth",
      });

    case AuthErrorCodes.OTP_CODE_EXPIRED:
      return t((w) => w.resetPassword.verifyOtpForm.errors.expiredCode, {
        ns: "auth",
      });

    default:
      return null;
  }
};

export const getVerifyOtpFieldErrorMap = (t: TFunction) =>
  createZodErrorMap<VerificationVerifyOtpCodeReq>(t, {
    code: {
      too_small: (_, t) => {
        return t((w) => w.resetPassword.verifyOtpForm.fields.otpCode.errors.wrongLength, {
          ns: "auth",
          length: authContractConfig.passwordOtpCode.length,
        });
      },
      too_big: (_, t) => {
        return t((w) => w.resetPassword.verifyOtpForm.fields.otpCode.errors.wrongLength, {
          ns: "auth",
          length: authContractConfig.passwordOtpCode.length,
        });
      },
      invalid_format: (_, t) => {
        return t((w) => w.resetPassword.verifyOtpForm.fields.otpCode.errors.invalid, {
          ns: "auth",
        });
      },
    },
  });
