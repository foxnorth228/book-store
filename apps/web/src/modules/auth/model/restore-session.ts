import { AuthApi } from "../api/auth.api";
import { useSessionStore } from "./use-session-store";

export async function restoreSession() {
  try {
    const response = await AuthApi.refreshSession();

    useSessionStore
      .getState()
      .setData({ accessToken: response.data.accessToken, isAuthenticated: true });
  } catch (e) {
    console.log(e);
    useSessionStore.getState().setData({ accessToken: undefined, isAuthenticated: false });
  }
}
