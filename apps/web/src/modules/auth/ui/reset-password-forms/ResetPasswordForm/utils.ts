import { VerificationUpdatePasswordReq, ZodCustomErrorCode } from "@org/contracts";
import { createZodErrorMap } from "@shared/lib";
import { TFunction } from "i18next";

export const getResetPasswordFormFieldErrorMap = (t: TFunction) =>
  createZodErrorMap<VerificationUpdatePasswordReq>(t, {
    password: {
      too_small: (issue, t) => {
        if (issue.minimum === 1) {
          return t((w) => w.resetPassword.updatePasswordForm.password.errors.required, {
            ns: "auth",
          });
        }

        return t((w) => w.resetPassword.updatePasswordForm.password.errors.tooShort, {
          ns: "auth",
          minimum: issue.minimum,
        });
      },
    },
    confirmPassword: {
      too_small: (issue, t) => {
        if (issue.minimum === 1) {
          return t((w) => w.resetPassword.updatePasswordForm.confirmPassword.errors.required, {
            ns: "auth",
          });
        }

        return t((w) => w.resetPassword.updatePasswordForm.confirmPassword.errors.tooShort, {
          ns: "auth",
          minimum: issue.minimum,
        });
      },

      custom: (issue, t) => {
        if (issue.params?.code === ZodCustomErrorCode.PasswordsMismatch) {
          return t((w) => w.resetPassword.updatePasswordForm.confirmPassword.errors.mismatch, {
            ns: "auth",
          });
        }

        return issue.message;
      },
    },
  });
