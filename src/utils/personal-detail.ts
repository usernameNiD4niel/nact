import { create } from "zustand";

type State = {
	firstName: string;
	middleInitial: string;
	lastName: string;
	gender: string;
	birthDate: string;
};

type Actions = {
	setFirstName: (firstName: string) => void;
	setMiddleInitial: (middleInitial: string) => void;
	setLastName: (lastName: string) => void;
	setGender: (gender: string) => void;
	setBirthDate: (birthDate: string) => void;
	reset: () => void;
};

const initialState: State = {
	firstName: "",
	birthDate: "",
	gender: "",
	lastName: "",
	middleInitial: "",
};

export const usePersonalDetailStore = create<State & Actions>()((set) => ({
	...initialState,

	setFirstName: (firstName: string) => {
		set({ firstName: firstName });
	},

	setMiddleInitial: (middleInitial: string) => {
		set({ middleInitial: middleInitial });
	},

	setBirthDate: (birthDate: string) => {
		set({ birthDate: birthDate });
	},

	setGender: (gender: string) => {
		set({ gender: gender });
	},

	setLastName: (lastName: string) => {
		set({ lastName: lastName });
	},

	reset: () => {
		set(initialState);
	},
}));
