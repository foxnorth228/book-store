import { create } from "zustand";

import { Profile } from "./types";

export interface ProfileState {
  profile: Profile | undefined;
}

export interface ProfileAction {
  setData: (data: Partial<ProfileState>) => void;
}

export type ProfileStore = ProfileState & ProfileAction;

export const useProfileStore = create<ProfileStore>((set) => ({
  profile: undefined,
  setData: (data) => set(data),
}));
