import { authRoutes } from "./auth.routes.js";
import { authSchemas } from "./auth.schemas.js";

export const authContracts = {
  login: {
    method: "POST",
    path: authRoutes.login,
    body: authSchemas.login.body,
    response: authSchemas.login.response,
  },
};
