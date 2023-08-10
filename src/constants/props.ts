import { FieldErrors, UseFormRegister } from "react-hook-form";

export type PersonalDetailProps = {
	firstName: string;
	middleInitial: string;
	lastName: string;
	birthDate: string;
	setFirstName: React.Dispatch<React.SetStateAction<string>>;
	setMiddleInitial: React.Dispatch<React.SetStateAction<string>>;
	setLastName: React.Dispatch<React.SetStateAction<string>>;
	setBirthDate: React.Dispatch<React.SetStateAction<string>>;
	register: UseFormRegister<User>;
	errors?: FieldErrors<User>;
};

export type CustomDropdownProps = {
	gender: string;
	setGender: (gender: string) => void;
	hasGenderError: boolean;
};

export type LoginFormProps = {
	extractedPin: string;
	phoneNumber: string;
};

export type OTPFieldProps = {
	otp: string[];
	setOtp: React.Dispatch<React.SetStateAction<string[]>>;
};

export type RegistrationSignature = {
	success: boolean;
	message: string;
	user: User;
};
export type User = {
	firstName: string;
	middleName: string;
	lastName: string;
	birthDate: string;
	gender: string;
	mobileNumber: string;
	pin: string;
	recoveryQuestion: string;
	recoveryAnswer: string;
	confirmPin?: string;
	setResponse?: React.Dispatch<React.SetStateAction<User | null>>;
};

export type PersonalDetailDatatypes = {
	firstName: string;
	middleInitial: string;
	lastName: string;
};

export type AccountDetailDatatypes = {
	mobileNumber: string;
	pin: string;
	confirmPin: string;
	recoveryQuestion: string;
	recoveryAnswer: string;
};

export type AccountDetailProps = {
	mobileNumber: string;
	pin: string;
	confirmPin: string;
	recoveryQuestion: string;
	recoveryAnswer: string;
	setMobileNumber: React.Dispatch<React.SetStateAction<string>>;
	setPin: React.Dispatch<React.SetStateAction<string>>;
	setConfirmPin: React.Dispatch<React.SetStateAction<string>>;
	setRecoveryQuestion: React.Dispatch<React.SetStateAction<string>>;
	setRecoveryAnswer: React.Dispatch<React.SetStateAction<string>>;
	register: UseFormRegister<User>;
	errors?: FieldErrors<User>;
};
