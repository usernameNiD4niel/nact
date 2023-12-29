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
import DeleteRole from "./delete-role";
interface VerticalOptionProps {
	roles: string[];
}

export default function VerticalOption({ roles }: VerticalOptionProps) {
	const [updateRoleOpen, setUpdateRoleOpen] = useState(false);
	const [deleteRoleOpen, setDeleteRoleOpen] = useState(false);

	function handleUpdate() {
		setUpdateRoleOpen(true);
	}

	function handleDelete() {
		setDeleteRoleOpen(true);
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
					<DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			{updateRoleOpen && (
				<UpdateRole
					roles={roles}
					setUpdateRoleOpen={setUpdateRoleOpen}
					updateRoleOpen={updateRoleOpen}
					//refetch={refetch}
				/>
			)}
			{deleteRoleOpen && (
				<DeleteRole
					deleteRoleOpen={deleteRoleOpen}
					roles={roles}
					setDeleteRoleOpen={setDeleteRoleOpen}
				/>
			)}
		</>
	);
}
