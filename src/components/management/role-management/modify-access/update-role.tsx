import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import updateRole from "@/api/roles";
import { toast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";

interface UpdateRoleProps {
	roles: string[];
	setUpdateRoleOpen: React.Dispatch<React.SetStateAction<boolean>>;
	updateRoleOpen: boolean;
}

export default function UpdateRole({
	roles,
	setUpdateRoleOpen,
	updateRoleOpen,
}: //refetch,
UpdateRoleProps) {
	const queryClient = useQueryClient();

	const [selectedRole, setSelectedRole] = useState("");
	const [newRole, setNewRole] = useState("");

	async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		console.log(`role : ${formData.get("role")}`);
		console.log(`new role : ${formData.get("new_role")}`);

		const { message, success } = await updateRole(selectedRole, {
			role: newRole,
		});

		if (success) {
			//   refetch();
			queryClient.refetchQueries(["modify-access-role", "get-access-role"]);
			toast({
				title: "Update Success",
				description: message,
			});
		} else {
			toast({
				title: "Update Failed",
				description: message,
			});
		}

		setUpdateRoleOpen(false);
	}

	function handleOnOpeChange(open: boolean) {
		setUpdateRoleOpen(open);
	}

	function handleOnValueChange(value: string) {
		setSelectedRole(value);
	}

	useEffect(() => {
		if (selectedRole) {
			setNewRole(selectedRole);
		}
	}, [selectedRole]);

	return (
		<Dialog onOpenChange={handleOnOpeChange} open={updateRoleOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Update Role</DialogTitle>
					<DialogDescription>
						Select a role to update or rename them
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleFormSubmit} className="flex flex-col gap-2">
					<Select
						required={true}
						name="role"
						onValueChange={handleOnValueChange}>
						<SelectTrigger /*className="w-[180px]"*/>
							<SelectValue placeholder="Select a role" />
						</SelectTrigger>
						<SelectContent>
							{roles.map((role) => (
								<SelectItem value={role} key={role}>
									{role}
								</SelectItem>
							))}
							{/* <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem> */}
						</SelectContent>
					</Select>
					<Input
						placeholder="Select role first"
						name="new_role"
						required
						value={newRole}
						onChange={(e) => setNewRole(e.target.value)}
					/>
					<Button className="mt-4">Update New Role</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
