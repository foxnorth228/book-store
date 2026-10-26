import { ProfileApi } from "../api/profile.api";
import { useProfileStore } from "./use-profile-store";

export async function loadProfile() {
  const profileRes = await ProfileApi.getMyProfile();

  useProfileStore.getState().setData({ profile: profileRes.data });
}
