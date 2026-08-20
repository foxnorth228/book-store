import { authContractConfig, AuthErrorCodes } from "@org/contracts";
import { handleError, isHttpAppError } from "@shared/lib";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { AuthApi } from "../../../api/auth.api";
import { FooterButtonLink } from "../../form-components";

interface RequestOtpButtonProps {
  email: string;
}

export function RequestOtpButton({ email }: RequestOtpButtonProps) {
  const { t } = useTranslation();

  const requestedEmail = useRef("");

  const [retryAfter, setRetryAfter] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleResend = async () => {
    if (retryAfter > 0 || isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      await AuthApi.forgotPassword({ email });

      setRetryAfter(authContractConfig.passwordOtpCode.resendCooldown);
    } catch (error) {
      if (isHttpAppError<AuthErrorCodes>(error)) {
        if (error.data.code === AuthErrorCodes.OTP_RESEND_TOO_SOON) {
          const timeLimit = parseInt(String(error.data.details));
          if (isFinite(timeLimit)) {
            setRetryAfter(timeLimit);
            toast.error(
              t((w) => w.resetPassword.verifyOtpForm.errors.tooMuchRequests, { ns: "auth" }),
            );
            return;
          }
        }
      }

      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (requestedEmail.current === email) {
      return;
    }

    requestedEmail.current = email;
    handleResend();
  }, [email]);

  useEffect(() => {
    if (retryAfter <= 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setRetryAfter((value) => Math.max(value - 1, 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [retryAfter]);

  return (
    <FooterButtonLink isDisabled={retryAfter > 0 || isLoading} onClick={handleResend}>
      {retryAfter > 0
        ? t((w) => w.resetPassword.verifyOtpForm.resendIn, {
            ns: "auth",
            seconds: retryAfter,
          })
        : t((w) => w.resetPassword.verifyOtpForm.resend, {
            ns: "auth",
          })}
    </FooterButtonLink>
  );
}
