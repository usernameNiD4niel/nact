export type PersonalDetailProps = {
	firstName: string;
	middleName: string;
	lastName: string;
	setFirstName: React.Dispatch<React.SetStateAction<string>>;
	setMiddleName: React.Dispatch<React.SetStateAction<string>>;
	setLastName: React.Dispatch<React.SetStateAction<string>>;
};

export type CustomDropdownProps = {
	gender: string;
	setGender: React.Dispatch<React.SetStateAction<string>>;
}

export type LoginFormProps = {
	pin: string;
	phoneNumber: string;
}

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
}