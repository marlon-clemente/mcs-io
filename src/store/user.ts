import { AuthenticateUserResponse } from "@/types/auth/interfaces";
import { create } from "zustand";

type User = Omit<AuthenticateUserResponse, "message" | "to">;

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  removeUser: () => void;
}

export const userStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
  removeUser: () => set(() => ({ user: null })),
}));
