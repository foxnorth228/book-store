import { AuthRoutes } from "@app/routing";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthApi } from "@modules/auth/api/auth.api";
import { useResetPasswordStore } from "@modules/auth/model/use-reset-password-store";
import { authContracts, VerificationRequestOtpCodeReq } from "@org/contracts";
import { handleError, RHFForm, RHFFormField } from "@shared/lib";
import { Input } from "@shared/ui";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import { Description, SubmitButton, Title } from "../form-components";

export function ForgotPasswordForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const setStoreData = useResetPasswordStore((s) => s.setData);
  const clearStoreData = useResetPasswordStore((s) => s.clear);

  const onSubmit = async (data: VerificationRequestOtpCodeReq) => {
    try {
      await AuthApi.forgotPassword(data);

      clearStoreData();
      setStoreData({ email: data.email });
      navigate(AuthRoutes.ForgotPasswordVerify);
    } catch (e) {
      handleError(e);
    }
  };

  return (
    <RHFForm<VerificationRequestOtpCodeReq>
      className="w-sm max-w-md -translate-y-30 p-5 sm:w-md"
      resolver={zodResolver(authContracts.passwordReset.requestOtpCode.body)}
      mode="onSubmit"
      onSubmit={onSubmit}
    >
      <Title>{t((w) => w.resetPassword.forgotPasswordForm.title, { ns: "auth" })}</Title>

      <Description>
        {t((w) => w.resetPassword.forgotPasswordForm.description, { ns: "auth" })}
      </Description>

      <RHFFormField<VerificationRequestOtpCodeReq>
        name="email"
        label={t((w) => w.resetPassword.forgotPasswordForm.email, { ns: "auth" })}
        render={({ field }) => (
          <Input
            {...field}
            type="email"
            placeholder={t((w) => w.resetPassword.forgotPasswordForm.emailPlaceholder, {
              ns: "auth",
            })}
          />
        )}
      />

      <SubmitButton type="submit">
        {t((w) => w.resetPassword.forgotPasswordForm.submit, { ns: "auth" })}
      </SubmitButton>
    </RHFForm>
  );
}
