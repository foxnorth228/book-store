import { authContracts, zodToJsonSchema } from "@org/contracts";

import { accountConfig } from "./account.config";

export const accountLoginReq = {
  $id: accountConfig.schemas.loginReq,
  ...zodToJsonSchema(authContracts.login.body),
};

export const accountLoginRes = {
  $id: accountConfig.schemas.loginRes,
  ...zodToJsonSchema(authContracts.login.response),
};

export const accountRegisterReq = {
  $id: accountConfig.schemas.registerReq,
  ...zodToJsonSchema(authContracts.register.body),
};

export const accountRegisterRes = {
  $id: accountConfig.schemas.registerRes,
  ...zodToJsonSchema(authContracts.register.response),
};

export const sessionRefreshRes = {
  $id: accountConfig.schemas.sessionRefreshRes,
  ...zodToJsonSchema(authContracts.session.refresh.response),
};

export const accountLoginAdminReq = {
  $id: accountConfig.schemas.loginAdminReq,
  ...zodToJsonSchema(authContracts.admin.login.body),
};

export const accountLoginAdminRes = {
  $id: accountConfig.schemas.loginAdminRes,
  ...zodToJsonSchema(authContracts.admin.login.response),
};

export const sessionRefreshAdminRes = {
  $id: accountConfig.schemas.sessionRefreshAdminRes,
  ...zodToJsonSchema(authContracts.admin.session.refresh.response),
};

export const accountSchemas = [
  accountLoginReq,
  accountLoginRes,
  accountRegisterReq,
  accountRegisterRes,
  sessionRefreshRes,
  accountLoginAdminReq,
  accountLoginAdminRes,
  sessionRefreshAdminRes,
];
