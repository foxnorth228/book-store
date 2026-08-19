import { AuthRoutes } from "@app/routing";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthApi } from "@modules/auth/api/auth.api";
import { authContracts, VerificationVerifyOtpCodeReq } from "@org/contracts";
import { handleError, RHFForm, RHFFormField } from "@shared/lib";
import { Button, Input, InputOtp } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useNavigate } from "react-router";

import { useResetPasswordStore } from "../../model/use-reset-password-store";
import { BackButton, Description, Footer, SubmitButton, Title } from "../form-components";

// eslint-disable-next-line
interface VerifyPasswordOtpFormProps {}

export const VerifyPasswordOtpForm: FC<VerifyPasswordOtpFormProps> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const email = useResetPasswordStore((s) => s.email);
  const setStoreData = useResetPasswordStore((s) => s.setData);

  const onSubmit = async (data: VerificationVerifyOtpCodeReq) => {
    try {
      const response = await AuthApi.verifyOtpCode(data);

      setStoreData({ resetToken: response.data.resetToken });
      navigate(AuthRoutes.ForgotPasswordReset);
    } catch (e) {
      handleError(e);
    }
  };

  if (!email) {
    return <Navigate to={AuthRoutes.ForgotPassword} replace />;
  }

  return (
    <>
      <BackButton onClick={() => navigate(AuthRoutes.ForgotPassword)}>
        {t((w) => w.back, { ns: "common" })}
      </BackButton>
      <RHFForm<VerificationVerifyOtpCodeReq>
        className="w-[288px] max-w-md -translate-y-30 p-5 sm:w-[384px]"
        resolver={zodResolver(authContracts.passwordReset.verifyOtpCode.body)}
        mode="onSubmit"
        onSubmit={onSubmit}
        defaultValues={{
          email,
          code: "",
        }}
      >
        <Title>{t((w) => w.resetPassword.verifyOtpForm.title, { ns: "auth" })}</Title>

        <Description>
          {t((w) => w.resetPassword.verifyOtpForm.description, {
            ns: "auth",
            email,
          })}
        </Description>

        <RHFFormField<VerificationVerifyOtpCodeReq>
          name="email"
          render={({ field }) => <Input {...field} hidden />}
        />

        <RHFFormField<VerificationVerifyOtpCodeReq>
          name="code"
          render={({ field }) => (
            <InputOtp
              maxLength={6}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
            >
              <InputOtp.Group className="flex w-full justify-center">
                <InputOtp.Slot className="size-12 sm:size-16" index={0} />
                <InputOtp.Slot className="size-12 sm:size-16" index={1} />
                <InputOtp.Slot className="size-12 sm:size-16" index={2} />
                <InputOtp.Slot className="size-12 sm:size-16" index={3} />
                <InputOtp.Slot className="size-12 sm:size-16" index={4} />
                <InputOtp.Slot className="size-12 sm:size-16" index={5} />
              </InputOtp.Group>
            </InputOtp>
          )}
        />

        <SubmitButton type="submit">
          {t((w) => w.resetPassword.verifyOtpForm.submit, { ns: "auth" })}
        </SubmitButton>

        <Footer>
          <span>{t((w) => w.resetPassword.verifyOtpForm.notReceived, { ns: "auth" })}</span>

          <Button type="button" variant="link">
            {t((w) => w.resetPassword.verifyOtpForm.resend, { ns: "auth" })}
          </Button>
        </Footer>
      </RHFForm>
    </>
  );
};
