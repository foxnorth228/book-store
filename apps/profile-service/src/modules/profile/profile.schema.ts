import { profileContracts, zodToJsonSchema } from "@org/contracts";

import { profileConfig } from "./profile.config";

const myProfileResSchema = {
  $id: profileConfig.schemas.myProfileRes,
  ...zodToJsonSchema(profileContracts.me.response),
};

export const profileSchemas = [myProfileResSchema];
