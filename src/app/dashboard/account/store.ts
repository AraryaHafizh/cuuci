import { create } from "zustand";

type ProfileState = {
  index: number;
  setIndex: (index: number) => void;
  resetIndex: () => void;
};

export const ProfileStore = create<ProfileState>((set) => ({
  index: 0,
  setIndex: (index: number) => set({ index }),
  resetIndex: () => set({ index: 0 }),
}));
