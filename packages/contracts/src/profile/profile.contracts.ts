import { BaseContract } from "../types.js";
import { profileRoutes } from "./profile.routes.js";
import { profileSchemas } from "./profile.schemas.js";

export const profileContracts: Record<string, BaseContract> = {
  me: {
    method: "GET",
    path: profileRoutes.myProfile,
    response: profileSchemas.myProfile.response,
  },
};
