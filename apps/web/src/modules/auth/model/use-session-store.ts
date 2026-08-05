import { create } from "zustand";

interface SessionState {
  accessToken: string | undefined;
}

interface SessionActions {
  setData: (data: Partial<SessionState>) => void;
}

type SessionStore = SessionState & SessionActions;

export const useSessionStore = create<SessionStore>((set) => ({
  accessToken: undefined,
  setData: (data) => {
    set(data);
  },
}));
