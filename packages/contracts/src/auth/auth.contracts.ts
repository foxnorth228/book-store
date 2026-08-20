import { authRoutes } from "./auth.routes.js";
import { authSchemas } from "./auth.schemas.js";

export const authContracts = {
  login: {
    method: "POST",
    path: authRoutes.login,
    body: authSchemas.login.body,
    response: authSchemas.login.response,
  },
  register: {
    method: "POST",
    path: authRoutes.register,
    body: authSchemas.register.body,
    response: authSchemas.register.response,
  },
  session: {
    prefix: authRoutes.session.$prefix,
    refresh: {
      method: "POST",
      path: authRoutes.session.refresh,
      response: authSchemas.login.response,
    },
    logout: {
      method: "DELETE",
      path: authRoutes.session.logout,
    },
  },
  passwordReset: {
    prefix: authRoutes.passwordReset.$prefix,
    requestOtpCode: {
      method: "POST",
      path: authRoutes.passwordReset.requestOtpCode,
      body: authSchemas.passwordReset.requestOtpCode.body,
      response: authSchemas.passwordReset.requestOtpCode.response,
    },
    verifyOtpCode: {
      method: "POST",
      path: authRoutes.passwordReset.verifyOtpCode,
      body: authSchemas.passwordReset.verifyOtpCode.body,
      response: authSchemas.passwordReset.verifyOtpCode.response,
    },
    updatePassword: {
      method: "PUT",
      path: authRoutes.passwordReset.updatePassword,
      body: authSchemas.passwordReset.updatePassword.body,
      response: authSchemas.passwordReset.updatePassword.response,
    },
  },
};
