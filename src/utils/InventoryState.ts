import { create } from "zustand";

type State = {
	tab: number;
};

type Actions = {
	setActiveTab: (tab: number) => void;
	reset: () => void;
};

const InitialState: State = {
	tab: 0,
};

export const useInventoryState = create<State & Actions>()((set) => ({
	...InitialState,

	setActiveTab: (tab: number) => {
		set({ tab: tab });
	},

	reset: () => {
		set(InitialState);
	},
}));
