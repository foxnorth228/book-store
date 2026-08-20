import { AuthRoutes } from "@app/routing";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResetPasswordStore } from "@modules/auth/model/use-reset-password-store";
import { authContracts, VerificationRequestOtpCodeReq } from "@org/contracts";
import { createZodErrorMap, handleError, RHFForm, RHFFormField } from "@shared/lib";
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
      resolver={zodResolver(authContracts.passwordReset.requestOtpCode.body, {
        error: createZodErrorMap<VerificationRequestOtpCodeReq>(t, {
          email: {
            too_small: (issue, t) => {
              if (issue.minimum === 1) {
                return t((w) => w.resetPassword.forgotPasswordForm.fields.email.errors.required, {
                  ns: "auth",
                });
              }

              return issue.message;
            },
            invalid_format: (_, t) =>
              t((w) => w.resetPassword.forgotPasswordForm.fields.email.errors.invalid, {
                ns: "auth",
              }),
          },
        }),
      })}
      mode="onSubmit"
      onSubmit={onSubmit}
      defaultValues={{
        email: "",
      }}
    >
      <Title>{t((w) => w.resetPassword.forgotPasswordForm.title, { ns: "auth" })}</Title>

      <Description>
        {t((w) => w.resetPassword.forgotPasswordForm.description, { ns: "auth" })}
      </Description>

      <RHFFormField<VerificationRequestOtpCodeReq>
        name="email"
        label={t((w) => w.resetPassword.forgotPasswordForm.fields.email.label, { ns: "auth" })}
        render={({ field, additionalProps }) => (
          <Input
            {...field}
            {...additionalProps}
            type="email"
            autoComplete="email"
            placeholder={t((w) => w.resetPassword.forgotPasswordForm.fields.email.placeholder, {
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
