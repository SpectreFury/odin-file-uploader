import { create } from "zustand";

type User = {
  id: number;
  email: string;
};

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
}));

export {  useUserStore };
