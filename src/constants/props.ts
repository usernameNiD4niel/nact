export type PersonalDetailProps = {
	firstName: string;
	middleName: string;
	lastName: string;
	birthDate: string;
	setFirstName: React.Dispatch<React.SetStateAction<string>>;
	setMiddleName: React.Dispatch<React.SetStateAction<string>>;
	setLastName: React.Dispatch<React.SetStateAction<string>>;
	setBirthDate: React.Dispatch<React.SetStateAction<string>>;
};

export type CustomDropdownProps = {
	gender: string;
	setGender: React.Dispatch<React.SetStateAction<string>>;
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
	setResponse?: React.Dispatch<React.SetStateAction<User | null>>;
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
};
