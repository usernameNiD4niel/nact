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
	mobileNumber: string;

	// Mutation state
	setLastName: React.Dispatch<React.SetStateAction<string>>;
	setFirstName: React.Dispatch<React.SetStateAction<string>>;
	setMiddleName: React.Dispatch<React.SetStateAction<string>>;
	setMobileNumber: React.Dispatch<React.SetStateAction<string>>;
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
		mobileNumber,
		setFirstName,
		setLastName,
		setMiddleName,
		setMobileNumber,
	} = userInfo;

	return (
		<div className="w-full space-y-3 md:max-w-4xl">
			<div className="w-full flex justify-between items-center">
				<h2>User Information</h2>
				<FormDropdown
					setIsDisabled={setIsDisabled}
					key="UsersFormDropdown"
					endpoint={`api/users/${id}`}
					modalLabel="This action cannot be undone. This will permanently delete this user and remove this data from our server."
					navigateTo="role-management"
				/>
			</div>
			<div className="flex flex-col gap-2">
				<Input
					placeholder="Last Name"
					className="py-6"
					disabled={isDisabled}
					required={true}
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
					key={"lastName"}
				/>
				<Input
					placeholder="First Name"
					className="py-6"
					disabled={isDisabled}
					required={true}
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
					key={"firstName"}
				/>
				<Input
					placeholder="Middle Name"
					className="py-6"
					disabled={isDisabled}
					value={middleName}
					required={true}
					onChange={(e) => setMiddleName(e.target.value)}
					key={"middleName"}
				/>
				<Input
					placeholder="Phone Number"
					className="py-6"
					disabled={isDisabled}
					required={true}
					value={mobileNumber}
					onChange={(e) => setMobileNumber(e.target.value)}
					key={"phoneNumber"}
				/>
			</div>
		</div>
	);
};

export default UserInformation;
