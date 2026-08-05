import { createHttpAuthClient } from "@modules/auth";
import { profileContracts, ProfileMeRes } from "@org/contracts";

export const ProfileApi = {
  httpClient: createHttpAuthClient({ baseUrl: import.meta.env.VITE_PROFILE_SERVICE_PREFIX }),
  getMyProfile() {
    return this.httpClient.request<ProfileMeRes>(profileContracts.me.path, {
      method: profileContracts.me.method,
    });
  },
};
