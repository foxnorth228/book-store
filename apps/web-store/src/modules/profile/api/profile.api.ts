import { SERVICES_ROUTES } from "@app/routing";
import { createHttpAuthClient } from "@modules/auth";
import { profileContracts, ProfileMeRes } from "@org/contracts";

export const ProfileApi = {
  httpClient: createHttpAuthClient({ baseUrl: SERVICES_ROUTES.PROFILE }),
  getMyProfile() {
    return this.httpClient.request<ProfileMeRes>(profileContracts.me.path, {
      method: profileContracts.me.method,
    });
  },
};
