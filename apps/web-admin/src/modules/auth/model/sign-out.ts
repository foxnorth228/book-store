import { router } from "@app/routing";
import { handleError } from "@shared/lib";

import { AuthApi } from "../api/auth.api";
import { useSessionStore } from "./use-session-store";

export async function signOut() {
  try {
    await AuthApi.logout();
  } catch (e) {
    handleError(e);
  } finally {
    useSessionStore.getState().clearSession();
    await router.navigate({ to: "/login", search: { redirect: "/" } });
  }
}
