import { create } from "zustand";

type State = {
  headerMenuCur: string;
};

type Action = {
  setHeaderMenuCur: (cur: State["headerMenuCur"]) => void;
};

const useStore = create<State & Action>((set) => ({
  headerMenuCur: "",
  setHeaderMenuCur: (cur) => set(() => ({ headerMenuCur: cur })),
}));

export default useStore;
