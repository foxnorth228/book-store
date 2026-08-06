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
};
