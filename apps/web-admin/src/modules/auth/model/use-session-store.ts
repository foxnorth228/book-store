import { AuthRole } from "@org/contracts";
import { create } from "zustand";

interface SessionState {
  user:
    | {
        id: string;
        roles: AuthRole[];
      }
    | undefined;
  accessToken: string | undefined;
  isAuthenticated: boolean;
  isSessionRestored: boolean;
}

interface SessionActions {
  setData: (data: Partial<SessionState>) => void;
  clearSession: () => void;
}

type SessionStore = SessionState & SessionActions;

export const useSessionStore = create<SessionStore>((set) => ({
  user: undefined,
  accessToken: undefined,
  isAuthenticated: false,
  isSessionRestored: false,
  setData: (data) => {
    set(data);
  },
  clearSession: () => {
    set({ user: undefined, accessToken: undefined, isAuthenticated: false });
  },
}));
