import { create } from "zustand";

// interface AccountDetailState {
// 	mobileNumber: string;
// 	pin: string;
// 	recoveryQuestion: string;
// 	recoveryAnswer: string;
// 	confirmPin: string;
// 	setMobileNumber: (mobileNumber: string) => void;
// 	setPin: (pin: string) => void;
// 	setRecoveryQuestion: (recoveryQuestion: string) => void;
// 	setRecoveryAnswer: (recoveryAnswer: string) => void;
// 	setConfirmPin: (confirmPin: string) => void;
// }

// export const useAccountDetailStore = create<AccountDetailState>((set) => ({
// 	mobileNumber: "",
// 	pin: "",
// 	recoveryQuestion: "",
// 	recoveryAnswer: "",
// 	confirmPin: "",
// 	setMobileNumber: (mobileNumber) =>
// 		set(() => ({ mobileNumber: mobileNumber })),
// 	setPin: (pin) => set(() => ({ pin: pin })),
// 	setRecoveryQuestion: (recoveryQuestion) =>
// 		set(() => ({ recoveryQuestion: recoveryQuestion })),
// 	setRecoveryAnswer: (recoveryAnswer) =>
// 		set(() => ({ recoveryAnswer: recoveryAnswer })),
// 	setConfirmPin: (confirmPin) => set(() => ({ confirmPin: confirmPin })),
// }));

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
