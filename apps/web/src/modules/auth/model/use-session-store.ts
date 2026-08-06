import { create } from "zustand";

interface SessionState {
  accessToken: string | undefined;
  isAuthenticated: boolean;
}

interface SessionActions {
  setData: (data: Partial<SessionState>) => void;
}

type SessionStore = SessionState & SessionActions;

export const useSessionStore = create<SessionStore>((set) => ({
  accessToken: undefined,
  isAuthenticated: false,
  setData: (data) => {
    set(data);
  },
}));
