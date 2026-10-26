import { AuthRoutes } from "@app/routing";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthApi } from "@modules/auth/api/auth.api";
import {
  authContractConfig,
  authContracts,
  AuthErrorCodes,
  VerificationVerifyOtpCodeReq,
} from "@org/contracts";
import { handleError, isHttpAppError, RHFForm, RHFFormField } from "@shared/lib";
import { InputOtp } from "@org/ui";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useNavigate } from "react-router";

import { useResetPasswordStore } from "../../../model/use-reset-password-store";
import {
  BackButton,
  Description,
  Footer,
  FormError,
  SubmitButton,
  Title,
} from "../../form-components";
import { RequestOtpButton } from "./RequestOtpButton";
import { getFormErrorMessage, getVerifyOtpFieldErrorMap } from "./utils";

// eslint-disable-next-line
interface VerifyPasswordOtpFormProps {}

export const VerifyPasswordOtpForm: FC<VerifyPasswordOtpFormProps> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formError, setFormError] = useState<AuthErrorCodes | null>(null);

  const email = useResetPasswordStore((s) => s.email);
  const setStoreData = useResetPasswordStore((s) => s.setData);

  const onSubmit = async (data: VerificationVerifyOtpCodeReq) => {
    setFormError(null);
    try {
      const response = await AuthApi.verifyOtpCode(data);

      setStoreData({ resetToken: response.data.resetToken });
      navigate(AuthRoutes.ForgotPasswordReset);
    } catch (e) {
      if (!isHttpAppError<AuthErrorCodes>(e)) {
        handleError(e);
        return;
      }

      switch (e.data.code) {
        case AuthErrorCodes.INVALID_OTP_CODE:
          setFormError(AuthErrorCodes.INVALID_OTP_CODE);
          return;

        case AuthErrorCodes.OTP_CODE_EXPIRED:
          setFormError(AuthErrorCodes.OTP_CODE_EXPIRED);
          return;

        default:
          handleError(e);
      }
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
        mode="onSubmit"
        onSubmit={onSubmit}
        defaultValues={{
          email,
          code: "",
        }}
        resolver={zodResolver(authContracts.passwordReset.verifyOtpCode.body, {
          error: getVerifyOtpFieldErrorMap(t),
        })}
      >
        <Title>{t((w) => w.resetPassword.verifyOtpForm.title, { ns: "auth" })}</Title>

        <Description>
          {t((w) => w.resetPassword.verifyOtpForm.description, {
            ns: "auth",
            email,
          })}
        </Description>

        {formError && <FormError>{getFormErrorMessage(formError, t)}</FormError>}

        <RHFFormField<VerificationVerifyOtpCodeReq>
          name="code"
          render={({ field, additionalProps }) => (
            <InputOtp
              {...additionalProps}
              maxLength={authContractConfig.passwordOtpCode.length}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              autoComplete="one-time-code"
              inputMode="numeric"
            >
              <InputOtp.Group className="flex w-full justify-center">
                {Array.from({ length: authContractConfig.passwordOtpCode.length }, (_, index) => (
                  <InputOtp.Slot key={index} className="size-12 sm:size-16" index={index} />
                ))}
              </InputOtp.Group>
            </InputOtp>
          )}
        />

        <SubmitButton type="submit">
          {t((w) => w.resetPassword.verifyOtpForm.submit, { ns: "auth" })}
        </SubmitButton>

        <Footer>
          <span>{t((w) => w.resetPassword.verifyOtpForm.notReceived, { ns: "auth" })}</span>

          <RequestOtpButton email={email} />
        </Footer>
      </RHFForm>
    </>
  );
};
