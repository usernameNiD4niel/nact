import { ButtonList } from "@/constants/enums";
import {
	animatedInputClass,
	animatedSpanClassHigh,
	cardClass,
} from "@/constants/reusable-class";
import Avatar from "@/daisyui/Avatar";
import { useSelectedStore } from "@/utils/HomePageState";
import React, { FC, useEffect, useState } from "react";
import AnimatedInputs from "../reuseable/AnimatedInputs";
import { FiLogOut } from "react-icons/fi";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Badge } from "../ui/badge";
import GenderRadio from "../reuseable/GenderRadio";
import CalendarComponent from "../reuseable/CalendarComponent";
import { parse } from "date-fns";
import { Button } from "../ui/button";

type UserInformation = {
	firstName: string;
	lastName: string;
	role: string;
	middleInitial: string;
	birthDate: string;
	gender: string;
	setMiddleInitial: React.Dispatch<React.SetStateAction<string>>;
	setFirstName?: React.Dispatch<React.SetStateAction<string>>;
	setLastName?: React.Dispatch<React.SetStateAction<string>>;
};

interface User {
	birthDate: string;
	firstName: string;
	gender: string;
	id: number;
	lastName: string;
	middleName: string;
	user_type: string;
}

const Account = () => {
	const [selected, setSelected] = useSelectedStore((state) => [
		state.selected,
		state.setSelected,
	]);

	const user = JSON.parse(Cookies.get("user") ?? "") as User;

	const [firstName, setFirstName] = useState<string>(user.firstName);
	const [lastName, setLastName] = useState<string>(user.lastName);
	const [middleInitial, setMiddleInitial] = useState<string>(user.middleName);

	const [isEditing, setIsEditing] = useState<boolean>(false);

	const navigate = useNavigate();

	const handleLogout = () => {
		Cookies.remove("token");
		Cookies.remove("role");
		Cookies.remove("user");
		navigate("/login");
	};

	useEffect(() => {
		if (selected !== ButtonList.Account) {
			setSelected(ButtonList.Account);
		}
	}, []);
	return (
		<React.Fragment>
			<section className="flex items-center justify-center py-16 px-4 md:p-8 space-y-4 w-full max-w-6xl">
				{/* w-[95%] lg:w-4/5 */}
				<section className="w-full flex flex-col gap-y-5">
					<div>
						<h2 className="font-bold text-lg">My Profile</h2>
						<p className="text-sm">Update your account information</p>
					</div>
					<ProfileComponent
						firstName={firstName}
						lastName={lastName}
						middleInitial={middleInitial}
						isSaved={isEditing}
						role={user.user_type}
					/>
					<PersonalInformation
						firstName={firstName}
						middleInitial={middleInitial}
						setMiddleInitial={setMiddleInitial}
						lastName={lastName}
						setFirstName={setFirstName}
						gender={user.gender}
						role={user.user_type}
						birthDate={user.birthDate}
						setLastName={setLastName}
						key="PersonalInformationKey"
					/>
					{isEditing && <ChangePassword isSaved={false} />}
					{isEditing && (
						<button
							className="bg-[#017DC3] text-white text-sm font-medium rounded-md p-3 w-fit hover:opacity-90 transition-opacity duration-150"
							onClick={() => setIsEditing(false)}>
							Update Changes
						</button>
					)}
				</section>
			</section>
			<div
				className="fixed bottom-4 right-4 text-lg flex hover:cursor-pointer items-center justify-center w-14 h-14 rounded-full bg-red-500 text-white md:right-6 md:bottom-4"
				onClick={handleLogout}>
				<FiLogOut />
			</div>
		</React.Fragment>
	);
};

interface ProfileComponentProps {
	firstName: string;
	lastName: string;
	isSaved: boolean;
	role: string;
	middleInitial: string;
}

const ProfileComponent: FC<ProfileComponentProps> = ({
	firstName,
	lastName,
	middleInitial,
	role,
}): JSX.Element => {
	return (
		<div
			className={`${cardClass} items-start gap-y-4 md:items-center flex-col md:flex-row`}>
			<div className="flex gap-x-3 w-full justify-between">
				<div className="flex flex-col justify-center">
					<Badge className="w-fit">{role.toUpperCase()}</Badge>
					<h3 className="font-bold text-lg">
						{firstName} {middleInitial} {lastName}
					</h3>
				</div>
				<Avatar alt="User profile logo" key="Account avatar" />
			</div>
		</div>
	);
};

const dateParser = (date: string) => {
	const parsedDate = parse(date, "MM-dd-yyyy", new Date());
	return parsedDate;
};

const PersonalInformation: FC<UserInformation> = ({
	firstName,
	middleInitial,
	setMiddleInitial,
	lastName,
	setFirstName = null,
	setLastName = null,
	gender,
	birthDate,
}): JSX.Element => {
	console.log(`birthday - ${birthDate}`);

	return (
		<div className={`${cardClass} flex-col gap-y-4 md:gap-y-6`}>
			<div>
				<h2 className="font-bold">Personal Information</h2>
				<p className="text-sm">Update your personal information</p>
			</div>
			<div className="grid sm:grid-cols-3 gap-8">
				<AnimatedInputs
					isDisabled={false}
					isRequired={true}
					inputType="firstName"
					label="First Name"
					setValue={setFirstName}
					type="text"
					value={firstName}
					key="firstNameKeyAccount"
				/>
				<AnimatedInputs
					isDisabled={false}
					isRequired={true}
					inputType="MiddleInitial"
					label="Middle Initial"
					setValue={setMiddleInitial}
					type="text"
					value={middleInitial}
					key="MiddleInitialKeyAccount"
				/>
				<AnimatedInputs
					isDisabled={false}
					isRequired={true}
					inputType="lastName"
					label="Last Name"
					setValue={setLastName}
					type="text"
					value={lastName}
					key="lastNameKeyAccount"
				/>
			</div>
			<div className="grid sm:grid-cols-3 gap-3">
				<div className="w-full space-y-2">
					<p className="text-xs md:text-sm font-bold">Gender</p>
					<GenderRadio gender={gender} />
				</div>

				<div>
					<p className="text-xs md:text-sm font-bold">Birthdate</p>
					<CalendarComponent birthDate={dateParser(birthDate)} />
				</div>
				<AnimatedInputs
					isDisabled={false}
					isRequired={true}
					inputType="phoneNumber"
					label="Phone Number"
					setValue={null}
					type="number"
					value={"09876543212"}
					key="phoneNumberKeyAccount"
				/>
			</div>
			<div className="mt-6 w-full flex justify-end flex-col md:flex-row gap-4">
				<Button className="md:w-fit bg-[#017DC3] hover:bg-[#017DC3]/90">
					Update
				</Button>
				<Button variant={"ghost"}>Reset</Button>
			</div>
		</div>
	);
};
const ChangePassword = ({ isSaved }: { isSaved: boolean }) => {
	const [newPassword, setNewPassword] = useState<string>("");

	return (
		<div className={`${cardClass} flex-col gap-y-4`}>
			<div>
				<h2 className="font-bold">Change Password</h2>
				<p className="text-sm">
					Your new password must be different from previous used passwords
				</p>
			</div>
			<div className="max-w-xl flex flex-col gap-y-5">
				<div className="w-full">
					<label className="relative" htmlFor="currentPassword">
						<input
							type="password"
							className={`${animatedInputClass}`}
							id="currentPassword"
							name="currentPassword"
							disabled={isSaved}
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							required
						/>
						<span
							className={`${animatedSpanClassHigh} ${
								newPassword && "input-contains"
							}`}>
							Current New Password
						</span>
					</label>
				</div>
				<div className="grid md:grid-cols-2 gap-5">
					<AnimatedInputs
						isDisabled={false}
						isRequired={true}
						inputType="newPassword"
						label="New Password"
						setValue={null}
						type="password"
						value={"thisisnotyourpassword"}
						key="newPasswordKeyAccount"
					/>
					<AnimatedInputs
						isDisabled={false}
						isRequired={true}
						inputType="confirmPassword"
						label="Confirm New Password"
						setValue={null}
						type="password"
						value={"thisisnotyourpassword"}
						key="confirmPasswordKeyAccount"
					/>
				</div>
				{/* https://www.behance.net/gallery/175120525/Account-Settings-Profile-User-Information?tracking_source=search_projects|account+page */}
			</div>
		</div>
	);
};

export default Account;
