import { deleteRole } from "@/api/roles";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";

interface HandleDeleteProps {
	deleteRoleOpen: boolean;
	selectedRole: string;
	setDeleteRoleOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function HandleDelete({
	deleteRoleOpen,
	setDeleteRoleOpen,
	selectedRole,
}: HandleDeleteProps) {
	const queryClient = useQueryClient();

	async function handleDelete() {
		console.log(`delete ${selectedRole}`);
		if (selectedRole.length > 0) {
			const { message, success } = await deleteRole(selectedRole);

			if (success) {
				queryClient.refetchQueries(["modify-access-role", "get-access-role"]);
				toast({
					title: "Successfully deleted",
					description: message,
				});
			} else {
				toast({
					title: "Failed to delete",
					description: message,
				});
			}

			setDeleteRoleOpen(false);
		}
	}

	return (
		<AlertDialog onOpenChange={setDeleteRoleOpen} open={deleteRoleOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete the
						selected role and the associated user role will be set to empty. Are
						you sure you still want to proceed?
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
