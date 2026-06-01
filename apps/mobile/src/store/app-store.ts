import { create } from 'zustand';

type SessionUser = {
  id: string;
  email: string;
  role: 'CUSTOMER' | 'VENDOR' | 'ADMIN';
};

type AppState = {
  apiReady: boolean;
  user: SessionUser | null;
  setApiReady: (apiReady: boolean) => void;
  setUser: (user: SessionUser | null) => void;
};

export const useAppStore = create<AppState>((set) => ({
  apiReady: false,
  user: null,
  setApiReady: (apiReady) => set({ apiReady }),
  setUser: (user) => set({ user }),
}));
