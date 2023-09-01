import { ButtonList } from "@/constants/enums";
import {
	animatedInputClass,
	animatedSpanClassHigh,
	cardClass,
} from "@/constants/reusable-class";
import Avatar from "@/daisyui/Avatar";
import { useSelectedStore } from "@/utils/HomePageState";
import { FC, useEffect, useState } from "react";
import AnimatedInputs from "../reuseable/AnimatedInputs";
import { AiFillEdit } from "react-icons/ai";

type UserInformation = {
	firstName: string;
	lastName: string;
	isSaved: boolean;
	setFirstName?: React.Dispatch<React.SetStateAction<string>>;
	setLastName?: React.Dispatch<React.SetStateAction<string>>;
};

const Account = () => {
	const [selected, setSelected] = useSelectedStore((state) => [
		state.selected,
		state.setSelected,
	]);

	const [firstName, setFirstName] = useState<string>("Daniel");
	const [lastName, setLastName] = useState<string>("Rey");

	const [isEditing, setIsEditing] = useState<boolean>(false);

	useEffect(() => {
		if (selected !== ButtonList.Account) {
			setSelected(ButtonList.Account);
		}
	}, []);
	return (
		<section className="flex px-4 py-5 pb-20 w-full">
			<section className="w-[95%] lg:w-4/5 flex flex-col gap-y-5">
				<div>
					<h2 className="font-bold text-xl">My Profile</h2>
					<p>Update your account information</p>
				</div>
				<div className="flex w-full justify-end items-center">
					{!isEditing && (
						<button
							className="bg-primary text-white rounded-lg gap-x-1 py-2 px-3 text-sm font-thin text-center flex items-center justify-center"
							onClick={() => setIsEditing(true)}>
							Edit Profile <AiFillEdit />
						</button>
					)}
				</div>
				<ProfileComponent
					firstName={firstName}
					lastName={lastName}
					isSaved={isEditing}
				/>
				<PersonalInformation
					firstName={firstName}
					isSaved={isEditing}
					lastName={lastName}
					setFirstName={setFirstName}
					setLastName={setLastName}
					key="PersonalInformationKey"
				/>
				{isEditing && <ChangePassword isSaved={false} />}
				{isEditing && (
					<button
						className="bg-[#209254] text-white text-sm font-medium rounded-md p-3 w-fit hover:opacity-90 transition-opacity duration-150"
						onClick={() => setIsEditing(false)}>
						Update Changes
					</button>
				)}
			</section>
		</section>
	);
};

const ProfileComponent: FC<UserInformation> = ({
	firstName,
	lastName,
	isSaved,
}): JSX.Element => {
	return (
		<div
			className={`${cardClass} items-start gap-y-4 md:items-center flex-col md:flex-row`}>
			<div className="flex gap-x-3 w-full">
				<Avatar
					width={"w-16"}
					height={"h-16"}
					alt="User profile logo"
					key="Account avatar"
				/>
				<div className="flex flex-col justify-center">
					<h3 className="font-bold">
						{firstName} {lastName}
					</h3>
					<p className="text-[13px] text-slate-400">Account Manager</p>
				</div>
			</div>
			{isSaved && (
				<div className="flex gap-x-2 w-full justify-end items-center">
					<button className="bg-primary hover:bg-primary-focus transition-opacity duration-150 text-white font-light px-3 py-[0.70rem] rounded-md text-xs ">
						Upload new picture
					</button>
					<button className="hover:text-[#EF4D21] text-primary bg-white border-2 border-primary hover:border-[#EF4D21] font-light px-3 py-[0.60rem] rounded-md text-xs">
						Remove
					</button>
				</div>
			)}
		</div>
	);
};

const PersonalInformation: FC<UserInformation> = ({
	firstName,
	isSaved,
	lastName,
	setFirstName = null,
	setLastName = null,
}): JSX.Element => {
	return (
		<div className={`${cardClass} flex-col gap-y-4`}>
			<div>
				<h2 className="font-bold">Personal Information</h2>
				<p className="">Update your personal information</p>
			</div>
			<div className="grid sm:grid-cols-2 gap-3 max-w-xl">
				{!isSaved ? (
					<div>
						<h3 className="font-medium">First Name</h3>
						<p className="font-thin text-sm">{firstName}</p>
					</div>
				) : (
					<AnimatedInputs
						isDisabled={false}
						inputType="firstName"
						label="First Name"
						setValue={setFirstName}
						type="text"
						value={firstName}
						key="firstNameKeyAccount"
					/>
				)}
				{!isSaved ? (
					<div>
						<h3 className="font-medium">Last Name</h3>
						<p className="font-thin text-sm">{lastName}</p>
					</div>
				) : (
					<AnimatedInputs
						isDisabled={false}
						inputType="lastName"
						label="Last Name"
						setValue={setLastName}
						type="text"
						value={lastName}
						key="lastNameKeyAccount"
					/>
				)}
			</div>
			<div className="grid sm:grid-cols-2 gap-3 max-w-xl">
				{!isSaved ? (
					<div>
						<h3 className="font-medium">Email Address</h3>
						<p className="font-thin text-sm">danielrey@gmail.com</p>
					</div>
				) : (
					<AnimatedInputs
						isDisabled={false}
						inputType="email"
						label="Email Address"
						setValue={null}
						type="email"
						value={"danielrey@gmail.com"}
						key="emailKeyAccount"
					/>
				)}
				{!isSaved ? (
					<div>
						<h3 className="font-medium">Phone Number</h3>
						<p className="font-thin text-sm">09876543212</p>
					</div>
				) : (
					<AnimatedInputs
						isDisabled={false}
						inputType="phoneNumber"
						label="Phone Number"
						setValue={null}
						type="number"
						value={"09876543212"}
						key="phoneNumberKeyAccount"
					/>
				)}
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
				<p className="">
					Your new password must be different from previous used passwords
				</p>
			</div>
			<div className="max-w-xl flex flex-col gap-y-5">
				<div className="w-full">
					<label className="relative" htmlFor="currentPassword">
						<input
							type="password"
							className={animatedInputClass}
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
						inputType="newPassword"
						label="New Password"
						setValue={null}
						type="password"
						value={"thisisnotyourpassword"}
						key="newPasswordKeyAccount"
					/>
					<AnimatedInputs
						isDisabled={false}
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
