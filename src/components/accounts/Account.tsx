import { ButtonList } from "@/constants/enums";
import { cardClass } from "@/constants/reusable-class";
import Avatar from "@/daisyui/Avatar";
import { useSelectedStore } from "@/utils/HomePageState";
import { FC, useEffect } from "react";

type UserInformation = {
	firstName: string;
	lastName: string;
	isSaved?: boolean;
};

const Account = () => {
	const [selected, setSelected] = useSelectedStore((state) => [
		state.selected,
		state.setSelected,
	]);

	useEffect(() => {
		if (selected !== ButtonList.Account) {
			setSelected(ButtonList.Account);
		}
	}, []);
	return (
		<section className="flex items-center justify-center py-5">
			<section className="w-4/5 flex flex-col gap-y-5">
				<div>
					<h2 className="font-bold text-xl">My Profile</h2>
					<p>Update your account information</p>
				</div>
				<ProfileComponent firstName="Daniel" lastName="Rey" isSaved={true} />
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
		<div className={cardClass}>
			<div className="flex gap-x-3 justify-center">
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
				<div className="flex gap-x-2">
					<button className="bg-primary hover:bg-primary-focus transition-opacity duration-150 text-white font-light px-3 py-[0.70rem] rounded-md text-sm ">
						Upload new picture
					</button>
					<button className="hover:text-[#EF4D21] text-primary bg-white border-2 border-primary hover:border-[#EF4D21] font-light px-3 py-[0.60rem] rounded-md text-sm ">
						Remove
					</button>
				</div>
			)}
		</div>
	);
};

// const PersonalInformation: FC<UserInformation> = ({
// 	firstName,
// 	isSaved,
// 	lastName,
// }): JSX.Element => {
// 	return (
// 		<div className={cardClass}>
// 			<h2 className="font-bold">Personal Information</h2>
// 			<p className="">Update your personal information</p>
// 			<div className="grid grid-cols-2">
// 			{/* https://www.behance.net/gallery/175120525/Account-Settings-Profile-User-Information?tracking_source=search_projects|account+page */}
// 			</div>
// 		</div>
// 	);
// };

export default Account;
