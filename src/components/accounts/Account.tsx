import { ButtonList } from "@/constants/enums";
import { cardClass } from "@/constants/reusable-class";
import Avatar from "@/daisyui/Avatar";
import { useSelectedStore } from "@/utils/HomePageState";
import React, { FC, useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Badge } from "../ui/badge";
import GenderRadio from "../reuseable/GenderRadio";
import CalendarComponent from "../reuseable/CalendarComponent";
import { parse } from "date-fns";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type UserInformation = {
	firstName: string;
	lastName: string;
	role: string;
	middleInitial: string;
	birthDate: string;
	gender: string;
	setMiddleInitial: React.Dispatch<React.SetStateAction<string>>;
	setFirstName: React.Dispatch<React.SetStateAction<string>>;
	setLastName: React.Dispatch<React.SetStateAction<string>>;
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
						gender={user.gender}
						middleInitial={middleInitial}
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
	role: string;
	middleInitial: string;
	gender: string;
}

const ProfileComponent: FC<ProfileComponentProps> = ({
	firstName,
	lastName,
	middleInitial,
	role,
	gender,
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
				<Avatar alt="User profile logo" key="Account avatar" gender={gender} />
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
	setFirstName,
	setLastName,
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
				<div className="w-full space-y-1">
					<Label htmlFor="firstName">Firstname</Label>
					<Input
						id="firstName"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
					/>
				</div>
				<div className="w-full space-y-1">
					<Label htmlFor="middleName">Middlename</Label>
					<Input
						id="middleName"
						value={middleInitial}
						onChange={(e) => setMiddleInitial(e.target.value)}
					/>
				</div>
				<div className="w-full space-y-1">
					<Label htmlFor="lastName">Lastname</Label>
					<Input
						id="lastName"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
					/>
				</div>
			</div>
			<div className="grid sm:grid-cols-3 items-center gap-8">
				<div className="space-y-1">
					<p className="text-xs md:text-sm">Birthdate</p>
					<CalendarComponent birthDate={dateParser(birthDate)} />
				</div>
				<div className="w-full space-y-1">
					<Label htmlFor="phoneNumber">Phone Number</Label>
					<Input id="phoneNumber" type="number" />
				</div>
				<div className="w-full space-y-2">
					<p className="text-xs md:text-sm">Gender</p>
					<GenderRadio gender={gender} />
				</div>
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

export default Account;
