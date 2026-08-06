import { ForgotPasswordPage, LoginPage, RegisterPage } from "@pages/authorization";
import { Homepage } from "@pages/homepage";

export enum AuthRoutes {
  Login = "login",
  Register = "register",
  ForgotPassword = "forgot-password",
}

export enum PublicRoutes {
  Homepage = "/",
}

export const routes = {
  auth: {
    [AuthRoutes.Login]: <LoginPage />,
    [AuthRoutes.Register]: <RegisterPage />,
    [AuthRoutes.ForgotPassword]: <ForgotPasswordPage />,
  },
  public: {
    [PublicRoutes.Homepage]: <Homepage />,
  },
};
