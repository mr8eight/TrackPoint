import { create } from "zustand";

type State = {};

type Action = {};

const useStore = create<State & Action>((set) => ({}));

export default useStore;
