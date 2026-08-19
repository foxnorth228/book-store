import { AuthRoutes, PublicRoutes } from "@app/routing";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthApi } from "@modules/auth/api/auth.api";
import { authContracts, VerificationUpdatePasswordReq, ZodCustomErrorCode } from "@org/contracts";
import { createZodErrorMap, RHFForm, RHFFormField } from "@shared/lib";
import { Input, PasswordInput } from "@shared/ui";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useNavigate } from "react-router";

import { useResetPasswordStore } from "../../model/use-reset-password-store";
import { BackButton, Description, SubmitButton, Title } from "../form-components";

export function ResetPasswordForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isCompleted, setIsCompleted] = useState(false);

  const resetToken = useResetPasswordStore((state) => state.resetToken);
  const clearStoreData = useResetPasswordStore((state) => state.clear);

  const handleSubmit = async (data: VerificationUpdatePasswordReq) => {
    await AuthApi.updatePassword(data);

    setIsCompleted(true);
    clearStoreData();
  };

  if (isCompleted) {
    return <Navigate to={PublicRoutes.Homepage} replace />;
  }

  if (!resetToken) {
    return <Navigate to={AuthRoutes.ForgotPassword} replace />;
  }

  return (
    <>
      <BackButton onClick={() => navigate(AuthRoutes.ForgotPasswordVerify)}>
        {t((w) => w.back, { ns: "common" })}
      </BackButton>
      <RHFForm<VerificationUpdatePasswordReq>
        mode="onSubmit"
        onSubmit={handleSubmit}
        defaultValues={{
          resetToken,
          password: "",
          confirmPassword: "",
        }}
        className="w-sm max-w-md -translate-y-30 p-5 sm:w-md"
        resolver={zodResolver(authContracts.passwordReset.updatePassword.body, {
          error: createZodErrorMap<VerificationUpdatePasswordReq>(t, {
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
                  return t(
                    (w) => w.resetPassword.updatePasswordForm.confirmPassword.errors.required,
                    {
                      ns: "auth",
                    },
                  );
                }

                return t(
                  (w) => w.resetPassword.updatePasswordForm.confirmPassword.errors.tooShort,
                  {
                    ns: "auth",
                    minimum: issue.minimum,
                  },
                );
              },

              custom: (issue, t) => {
                if (issue.params?.code === ZodCustomErrorCode.PasswordsMismatch) {
                  return t(
                    (w) => w.resetPassword.updatePasswordForm.confirmPassword.errors.mismatch,
                    {
                      ns: "auth",
                    },
                  );
                }

                return issue.message;
              },
            },
          }),
        })}
      >
        <Title>{t((w) => w.resetPassword.updatePasswordForm.title, { ns: "auth" })}</Title>

        <Description>
          {t((w) => w.resetPassword.updatePasswordForm.description, {
            ns: "auth",
          })}
        </Description>

        <RHFFormField<VerificationUpdatePasswordReq>
          name="resetToken"
          render={({ field }) => <Input {...field} hidden />}
        />

        <RHFFormField<VerificationUpdatePasswordReq>
          name="password"
          label={t((w) => w.resetPassword.updatePasswordForm.password.label, { ns: "auth" })}
          render={({ field }) => (
            <PasswordInput
              {...field}
              placeholder={t((w) => w.resetPassword.updatePasswordForm.password.placeholder, {
                ns: "auth",
              })}
            />
          )}
        />

        <RHFFormField<VerificationUpdatePasswordReq>
          name="confirmPassword"
          label={t((w) => w.resetPassword.updatePasswordForm.confirmPassword.label, { ns: "auth" })}
          render={({ field }) => (
            <PasswordInput
              {...field}
              placeholder={t(
                (w) => w.resetPassword.updatePasswordForm.confirmPassword.placeholder,
                {
                  ns: "auth",
                },
              )}
            />
          )}
        />

        <SubmitButton type="submit">
          {t((w) => w.resetPassword.updatePasswordForm.submit, { ns: "auth" })}
        </SubmitButton>
      </RHFForm>
    </>
  );
}
