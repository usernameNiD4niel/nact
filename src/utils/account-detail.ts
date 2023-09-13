import { create } from "zustand";

type State = {
	mobileNumber: string;
	pin: string;
	confirmPin: string;
	gender: string;
};

type Actions = {
	setMobileNumber: (mobileNumber: string) => void;
	setPin: (pin: string) => void;
	setConfirmPin: (confirmPin: string) => void;
	setGender: (gender: string) => void;
	reset: () => void;
};

const initialState: State = {
	mobileNumber: "",
	pin: "",
	confirmPin: "",
	gender: "",
};

export const useAccountDetailStore = create<State & Actions>()((set) => ({
	...initialState,

	setMobileNumber: (mobileNumber) => {
		set({ mobileNumber: mobileNumber });
	},
	setPin: (pin) => {
		set({ pin: pin });
	},
	setGender: (gender) => {
		set({ gender: gender });
	},
	setConfirmPin: (confirmPin) => {
		set({ confirmPin: confirmPin });
	},
	reset: () => {
		set(initialState);
	},
}));
