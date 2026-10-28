import { AuthRoutes, PublicRoutes } from "@app/routing";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthApi } from "@modules/auth/api/auth.api";
import { authContracts, AuthErrorCodes, VerificationUpdatePasswordReq } from "@org/contracts";
import { handleError, isHttpAppError, RHFForm, RHFFormField } from "@shared/lib";
import { PasswordInput } from "@shared/ui";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useNavigate } from "react-router";
import { toast } from "@org/ui";

import { useResetPasswordStore } from "../../../model/use-reset-password-store";
import { BackButton, Description, SubmitButton, Title } from "../../form-components";
import { getResetPasswordFormFieldErrorMap } from "./utils";

export function ResetPasswordForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isCompleted, setIsCompleted] = useState(false);

  const email = useResetPasswordStore((state) => state.email);
  const resetToken = useResetPasswordStore((state) => state.resetToken);
  const clearStoreData = useResetPasswordStore((state) => state.clear);

  const handleSubmit = async (data: VerificationUpdatePasswordReq) => {
    try {
      await AuthApi.updatePassword(data);

      setIsCompleted(true);
      clearStoreData();
    } catch (e) {
      if (isHttpAppError<AuthErrorCodes>(e)) {
        if (e.data.code === AuthErrorCodes.INVALID_RESET_TOKEN) {
          toast(t((w) => w.resetPassword.updatePasswordForm.errors.invalidToken, { ns: "auth" }));
        }
        return;
      }

      handleError(e);
    }
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
          error: getResetPasswordFormFieldErrorMap(t),
        })}
      >
        <Title>{t((w) => w.resetPassword.updatePasswordForm.title, { ns: "auth" })}</Title>

        <Description>
          {t((w) => w.resetPassword.updatePasswordForm.description, {
            ns: "auth",
          })}
        </Description>

        <input
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          readOnly
          className="sr-only"
        />

        <RHFFormField<VerificationUpdatePasswordReq>
          name="password"
          label={t((w) => w.resetPassword.updatePasswordForm.password.label, { ns: "auth" })}
          render={({ field, additionalProps }) => (
            <PasswordInput
              {...field}
              {...additionalProps}
              autoComplete="new-password"
              placeholder={t((w) => w.resetPassword.updatePasswordForm.password.placeholder, {
                ns: "auth",
              })}
            />
          )}
        />

        <RHFFormField<VerificationUpdatePasswordReq>
          name="confirmPassword"
          label={t((w) => w.resetPassword.updatePasswordForm.confirmPassword.label, { ns: "auth" })}
          render={({ field, additionalProps }) => (
            <PasswordInput
              {...field}
              {...additionalProps}
              autoComplete="new-password"
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
