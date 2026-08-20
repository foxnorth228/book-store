import { AuthRegisterReq, ZodCustomErrorCode } from "@org/contracts";
import { createZodErrorMap } from "@shared/lib";
import { TFunction } from "i18next";

export const createRegisterFormZodErrorsMapper = (t: TFunction) =>
  createZodErrorMap<AuthRegisterReq>(t, {
    email: {
      too_small: (issue, t) => {
        if (issue.minimum === 1) {
          return t((w) => w.registerModal.fields.email.errors.required, {
            ns: "auth",
          });
        }

        return issue.message;
      },

      invalid_format: (_, t) =>
        t((w) => w.registerModal.fields.email.errors.invalid, {
          ns: "auth",
        }),
    },

    password: {
      too_small: (issue, t) => {
        if (issue.minimum === 1) {
          return t((w) => w.registerModal.fields.password.errors.required, {
            ns: "auth",
          });
        }

        return t((w) => w.registerModal.fields.password.errors.tooShort, {
          ns: "auth",
          minimum: issue.minimum,
        });
      },
    },

    confirmPassword: {
      too_small: (issue, t) => {
        if (issue.minimum === 1) {
          return t((w) => w.registerModal.fields.confirmPassword.errors.required, { ns: "auth" });
        }

        return t((w) => w.registerModal.fields.confirmPassword.errors.tooShort, {
          ns: "auth",
          minimum: issue.minimum,
        });
      },

      custom: (issue, t) => {
        console.log(issue);
        if (issue.params?.code === ZodCustomErrorCode.PasswordsMismatch) {
          return t((w) => w.registerModal.fields.confirmPassword.errors.mismatch, { ns: "auth" });
        }

        return issue.message;
      },
    },
  });
