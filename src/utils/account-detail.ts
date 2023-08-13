import { create } from "zustand";

type State = {
	mobileNumber: string;
	pin: string;
	recoveryQuestion: string;
	recoveryAnswer: string;
	confirmPin: string;
};

type Actions = {
	setMobileNumber: (mobileNumber: string) => void;
	setPin: (pin: string) => void;
	setRecoveryQuestion: (question: string) => void;
	setRecoveryAnswer: (answer: string) => void;
	setConfirmPin: (confirmPin: string) => void;
	reset: () => void;
};

const initialState: State = {
	mobileNumber: "",
	pin: "",
	recoveryQuestion: "",
	recoveryAnswer: "",
	confirmPin: "",
};

export const useAccountDetailStore = create<State & Actions>()((set) => ({
	...initialState,

	setMobileNumber: (mobileNumber) => {
		set({ mobileNumber: mobileNumber });
	},
	setPin: (pin) => {
		set({ pin: pin });
	},
	setRecoveryQuestion: (question) => {
		set({ recoveryQuestion: question });
	},
	setConfirmPin: (confirmPin) => {
		set({ confirmPin: confirmPin });
	},
	setRecoveryAnswer: (answer) => {
		set({ recoveryAnswer: answer });
	},
	reset: () => {
		set(initialState);
	},
}));
