import * as React from "react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsChevronDown } from "react-icons/bs";

const DropdownRoles = () => {
	const [selectedItem, setSelectedItem] = React.useState("");
	const handleOnSelectRole = (item: string) => {
		setSelectedItem(item);
	};
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="max-w-xs">
					<span className="w-full text-start flex gap-2 items-center justify-between">
						<span>{selectedItem ? selectedItem : "Roles"}</span>{" "}
						<BsChevronDown />
					</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-[320px]">
				<DropdownMenuItem onClick={() => handleOnSelectRole("Administrator")}>
					Administrator
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => handleOnSelectRole("Supplier Chain")}>
					Supplier Chain
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => handleOnSelectRole("Sales Agent")}>
					Sales Agent
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => handleOnSelectRole("Billing and Collection")}>
					Billing and Collection
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default DropdownRoles;