import { accountConfig } from "./account.config";

export const accountUserReqSchema = {
  $id: accountConfig.schemas.accountUserReq,
  type: "object",
  required: ["email", "password"],
  additionalProperties: false,
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string" },
  },
};
