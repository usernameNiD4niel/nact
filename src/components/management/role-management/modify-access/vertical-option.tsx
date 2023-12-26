import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SlOptionsVertical } from "react-icons/sl";
import UpdateRole from "./update-role";
import { useState } from "react";

interface VerticalOptionProps {
	roles: string[];
}

export default function VerticalOption({ roles }: VerticalOptionProps) {
	const [updateRoleOpen, setUpdateRoleOpen] = useState(false);

	function handleUpdate() {
		setUpdateRoleOpen(true);
	}

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant={"link"} className="text-xs p-0" type="button">
						<SlOptionsVertical />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem onClick={handleUpdate}>Update</DropdownMenuItem>
					<DropdownMenuItem>Delete</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			{updateRoleOpen && (
				<UpdateRole
					roles={roles}
					setUpdateRoleOpen={setUpdateRoleOpen}
					updateRoleOpen={updateRoleOpen}
				/>
			)}
		</>
	);
}
