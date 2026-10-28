import { create } from "zustand";

export interface ResetPasswordState {
  email?: string;
  resetToken?: string;
}

export interface ResetPasswordActions {
  setData: (data: Partial<ResetPasswordState>) => void;
  clear: () => void;
}

export type ResetPasswordStore = ResetPasswordActions & ResetPasswordState;

export const useResetPasswordStore = create<ResetPasswordStore>((set) => ({
  email: undefined,
  resetToken: undefined,
  setData: (data) => set(data),
  clear: () => set({ email: undefined, resetToken: undefined }),
}));
