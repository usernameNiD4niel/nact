import * as React from "react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsChevronDown } from "react-icons/bs";

interface DropdownRolesProps {
	items: string[];
	label: string;
	selectedItem: string;
	setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
}

const DropdownRoles: React.FC<DropdownRolesProps> = ({
	items,
	label,
	selectedItem,
	setSelectedItem,
}) => {
	const handleOnSelectRole = (item: string) => {
		setSelectedItem(item);
	};
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="max-w-xs">
					<span className="w-full text-start flex gap-2 items-center justify-between">
						<span>{selectedItem ? selectedItem : label}</span> <BsChevronDown />
					</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-[320px]">
				{items.map((item, index) => (
					<DropdownMenuItem
						key={index}
						onClick={() => handleOnSelectRole(item)}>
						{item}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default DropdownRoles;
