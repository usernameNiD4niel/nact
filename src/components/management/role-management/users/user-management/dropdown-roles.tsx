import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FC } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface DropdownRolesProps {
	isDisabled: boolean;
	userType: string;
	setUserType: React.Dispatch<React.SetStateAction<string>>;
}

const DropdownRoles: FC<DropdownRolesProps> = ({
	isDisabled,
	setUserType,
	userType,
}) => {
	const handleRoleSelection = (role: string) => {
		setUserType(role);
	};
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant={"outline"}
					className="flex justify-between w-full items-center py-6"
					disabled={isDisabled}>
					<span className="text-gray-500">{userType}</span>
					<span className="text-gray-500">
						<IoIosArrowDown />
					</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="md:w-[250px]">
				<DropdownMenuItem
					className="p-2 cursor-pointer text-sm"
					onClick={() => handleRoleSelection("Admin")}>
					Admin
				</DropdownMenuItem>
				<DropdownMenuItem
					className="p-2 cursor-pointer text-sm"
					onClick={() => handleRoleSelection("Supplier Chain")}>
					Supply Chain
				</DropdownMenuItem>
				<DropdownMenuItem
					className="p-2 cursor-pointer text-sm"
					onClick={() => handleRoleSelection("Sales Agent")}>
					Sales Agent
				</DropdownMenuItem>
				<DropdownMenuItem
					className="p-2 cursor-pointer text-sm"
					onClick={() => handleRoleSelection("Billing and Collection")}>
					Billing and Collection
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default DropdownRoles;
