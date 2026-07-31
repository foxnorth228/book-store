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

export const accountSchemas = [
  accountLoginReq,
  accountLoginRes,
  accountRegisterReq,
  accountRegisterRes,
];
