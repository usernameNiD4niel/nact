import { ButtonList } from "@/constants/enums";
import { create } from "zustand";

type State = {
	selected: ButtonList | null;
};

type Actions = {
	setSelected: (value: ButtonList) => void;
	reset: () => void;
};

const initialState: State = {
	selected: null,
};

export const useSelectedStore = create<State & Actions>()((set) => ({
	...initialState,

	setSelected: (selected: ButtonList) => {
		set({ selected });
	},

	reset: () => {
		set(initialState);
	},
}));
