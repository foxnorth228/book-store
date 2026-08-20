import {
  ForgotPasswordPage,
  ResetPasswordPage,
  VerifyPasswordOtpCodePage,
} from "@pages/authorization";
import { Homepage } from "@pages/homepage";

export enum AuthRoutes {
  ForgotPassword = "/forgot-password",
  ForgotPasswordVerify = "/forgot-password/verify",
  ForgotPasswordReset = "/forgot-password/reset",
}

export enum PublicRoutes {
  Homepage = "/",
}

export const routes = {
  auth: {
    [AuthRoutes.ForgotPassword]: <ForgotPasswordPage />,
    [AuthRoutes.ForgotPasswordVerify]: <VerifyPasswordOtpCodePage />,
    [AuthRoutes.ForgotPasswordReset]: <ResetPasswordPage />,
  },
  public: {
    [PublicRoutes.Homepage]: <Homepage />,
  },
};
