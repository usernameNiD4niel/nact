import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";
import HandleDelete from "./handle-delete";
import { toast } from "@/components/ui/use-toast";

interface DeleteRoleProps {
	roles: string[];
	deleteRoleOpen: boolean;
	setDeleteRoleOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DeleteRole({
	deleteRoleOpen,
	roles,
	setDeleteRoleOpen,
}: DeleteRoleProps) {
	const [toBeDeleted, setToBeDeleted] = useState("");

	function handleFormSubmit(form: FormEvent<HTMLFormElement>) {
		form.preventDefault();

		const formData = new FormData(form.currentTarget);
		const role = formData.get("role")?.toString();

		if (!role) {
			toast({
				title: "Failed to delete",
				description: "Please select an item you want to be deleted first",
				duration: 4000,
			});
			return;
		}

		console.log(`role: ${role}`);
		setToBeDeleted(role);
		// do nothing here since the HandleDelete component will do the rest
	}

	return (
		<>
			<Dialog onOpenChange={setDeleteRoleOpen} open={deleteRoleOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Delete Role</DialogTitle>
						<DialogDescription>
							Select a role you want to delete
						</DialogDescription>
					</DialogHeader>
					<form
						onSubmit={handleFormSubmit}
						className="flex flex-col gap-2 w-full">
						<Select required={true} name="role">
							<SelectTrigger>
								<SelectValue placeholder="Select a role" />
							</SelectTrigger>
							<SelectContent>
								{roles.map((role) => (
									<SelectItem value={role} key={role}>
										{role}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<div className="flex w-full justify-end gap-3 items-center">
							<DialogClose type="button" className="mt-4">
								Cancel
							</DialogClose>
							<Button className="mt-4">Delete</Button>
						</div>
					</form>
				</DialogContent>
			</Dialog>
			{toBeDeleted && (
				<HandleDelete
					setDeleteRoleOpen={setDeleteRoleOpen}
					deleteRoleOpen={deleteRoleOpen}
					selectedRole={toBeDeleted}
				/>
			)}
		</>
	);
}
