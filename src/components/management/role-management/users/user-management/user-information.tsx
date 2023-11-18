import FormDropdown from "@/components/reuseable/FormDropdown";
import { Input } from "@/components/ui/input";
import { FC } from "react";

interface UserInformationProps {
	setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
	id: string;
	isDisabled: boolean;
	userInfo: UserInfo;
}

type UserInfo = {
	// Fields data
	lastName: string;
	firstName: string;
	middleName: string;
	phoneNumber: string;

	// Mutation state
	setLastName: React.Dispatch<React.SetStateAction<string>>;
	setFirstName: React.Dispatch<React.SetStateAction<string>>;
	setMiddleName: React.Dispatch<React.SetStateAction<string>>;
	setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
};

const UserInformation: FC<UserInformationProps> = ({
	setIsDisabled,
	id,
	isDisabled,
	userInfo,
}) => {
	const {
		firstName,
		lastName,
		middleName,
		phoneNumber,
		setFirstName,
		setLastName,
		setMiddleName,
		setPhoneNumber,
	} = userInfo;

	return (
		<div className="w-full space-y-3 md:max-w-4xl">
			<div className="w-full flex justify-between items-center">
				<h2>User Information</h2>
				<FormDropdown
					setIsDisabled={setIsDisabled}
					key="UsersFormDropdown"
					endpoint={`api/users/${id}`}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<Input
					placeholder="Last Name"
					className="py-6"
					disabled={isDisabled}
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
				/>
				<Input
					placeholder="First Name"
					className="py-6"
					disabled={isDisabled}
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
				/>
				<Input
					placeholder="Middle Name"
					className="py-6"
					disabled={isDisabled}
					value={middleName}
					onChange={(e) => setMiddleName(e.target.value)}
				/>
				<Input
					placeholder="Phone Number"
					className="py-6"
					disabled={isDisabled}
					value={phoneNumber}
					onChange={(e) => setPhoneNumber(e.target.value)}
				/>
			</div>
		</div>
	);
};

export default UserInformation;
