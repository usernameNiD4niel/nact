import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import updateRole from "@/api/roles";
import { toast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Label } from "@/components/ui/label";

interface UpdateRoleProps {
	role: string;
	setUpdateRoleOpen: React.Dispatch<React.SetStateAction<boolean>>;
	updateRoleOpen: boolean;
}

export default function UpdateRole({
	role,
	setUpdateRoleOpen,
	updateRoleOpen,
}: //refetch,
UpdateRoleProps) {
	const queryClient = useQueryClient();

	async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const newRole = formData.get("new_role")?.toString();

		if (!newRole) {
			return;
		}

		const { message, success } = await updateRole(role, {
			role: newRole,
		});

		if (success) {
			//   refetch();
			queryClient.refetchQueries(["modify-access-module", "get-access-module"]);
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

	return (
		<Dialog onOpenChange={handleOnOpeChange} open={updateRoleOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Update Role</DialogTitle>
					<DialogDescription>
						Select a role to update or rename them
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
					<Label className="space-y-2">
						<span>Selected role</span>
						<Input name="role" required defaultValue={role} disabled />
					</Label>
					<Label className="space-y-2">
						<span>New role</span>
						<Input placeholder="Enter new role" name="new_role" required />
					</Label>
					<Button className="mt-4">Update New Role</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
