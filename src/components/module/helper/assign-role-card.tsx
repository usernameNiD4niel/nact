import { cn } from "@/lib/utils";
import { FC, useState } from "react";
import { AiFillContacts } from "react-icons/ai";
import { FaBirthdayCake } from "react-icons/fa";
import { PiGenderFemaleFill, PiGenderMaleFill } from "react-icons/pi";

interface AssignRoleProps {
	fullName: string;
	birthday: string;
	contact: string;
	gender: string;
	dateCreated: string;
}

const AssignRoleCard: FC<AssignRoleProps> = ({
	birthday,
	contact,
	dateCreated,
	fullName,
	gender,
}) => {
	const [isSelected, setIsSelected] = useState<boolean>(false);

	const handleOnClick = () => {
		setIsSelected((prevSelected) => !prevSelected);
	};
	return (
		<div
			className={cn(
				"w-full cursor-pointer md:max-w-[380px] px-3 py-4 border hover:border-[#017DC3] hover:border-2 transition-background duration-150 ease-in border-black border-opacity-20 space-y-2 rounded-md drop-shadow-md",
				isSelected ? "bg-[#017DC3] text-white" : "bg-white text-black",
			)}
			onClick={handleOnClick}>
			<h1 className="font-bold text-xl md:text-2xl">{fullName}</h1>
			<p className="flex items-center gap-2 text-lg">
				<span>
					<FaBirthdayCake />
				</span>
				<span className="text-sm">{birthday}</span>
			</p>
			<p className="flex items-center gap-2 text-lg">
				<span>
					<AiFillContacts />
				</span>
				<span className="text-sm">{contact}</span>
			</p>
			<p className="flex items-center gap-2 text-lg">
				{gender.toLowerCase().trim() === "female" ? (
					<span>
						<PiGenderFemaleFill />
					</span>
				) : (
					<span>
						<PiGenderMaleFill />
					</span>
				)}
				<span className="text-sm">{gender}</span>
			</p>
			<div className="w-full flex justify-end items-center">
				<span className="text-xs font-light">{dateCreated}</span>
			</div>
		</div>
	);
};

export default AssignRoleCard;
