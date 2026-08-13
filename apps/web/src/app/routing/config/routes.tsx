import { ForgotPasswordPage } from "@pages/authorization";
import { Homepage } from "@pages/homepage";

export enum AuthRoutes {
  ForgotPassword = "forgot-password",
}

export enum PublicRoutes {
  Homepage = "/",
}

export const routes = {
  auth: {
    [AuthRoutes.ForgotPassword]: <ForgotPasswordPage />,
  },
  public: {
    [PublicRoutes.Homepage]: <Homepage />,
  },
};
