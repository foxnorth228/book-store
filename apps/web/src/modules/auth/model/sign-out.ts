import { handleError } from "@shared/lib";

import { AuthApi } from "../api/auth.api";
import { useSessionStore } from "./use-session-store";

export async function signOut() {
  try {
    await AuthApi.logout();

    useSessionStore.getState().clearSession();
  } catch (e) {
    handleError(e);
  }
}
