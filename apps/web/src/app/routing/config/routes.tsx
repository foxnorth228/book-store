import { ForgotPasswordPage, LoginPage, RegisterPage } from "@pages/authorization";

export enum AuthRoutes {
  Login = "login",
  Register = "register",
  ForgotPassword = "forgot-password",
}

export const routes = {
  auth: {
    [AuthRoutes.Login]: <LoginPage />,
    [AuthRoutes.Register]: <RegisterPage />,
    [AuthRoutes.ForgotPassword]: <ForgotPasswordPage />,
  },
};
