import { profileRoutes } from "./profile.routes.js";
import { profileSchemas } from "./profile.schemas.js";

export const profileContracts = {
  me: {
    method: "GET",
    path: profileRoutes.myProfile,
    response: profileSchemas.myProfile.response,
  },
};
