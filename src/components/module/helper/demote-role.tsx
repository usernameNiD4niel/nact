import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { MdGroupAdd } from "react-icons/md";
import DropdownRoles from "./dropdown-roles";
import { FC, useState } from "react";
import { updateUsersRole } from "@/api/account";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface DemoteRoleProps {
	phoneNumbers: string[];
}

const DemoteRole: FC<DemoteRoleProps> = ({ phoneNumbers }) => {
	const [selectedItem, setSelectedItem] = useState("");
	const [isUpdating, setIsUpdating] = useState(false);
	const { toast } = useToast();
	const router = useNavigate();

	const handleContinue = async () => {
		setIsUpdating(true);
		const { message, success } = await updateUsersRole({
			role: selectedItem,
			usersPN: phoneNumbers,
		});

		let title;

		if (success) {
			title = "Update Success";
		} else {
			title = "Update Failure";
		}
		router(0);

		toast({
			title: title,
			description: message,
			duration: 3000,
		});

		setIsUpdating(false);
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button className="fixed bottom-3 right-3 flex gap-2 items-center justify-center">
					<span>
						<MdGroupAdd />
					</span>
					<span>Update Role</span>
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="max-w-md">
				<AlertDialogHeader>
					<AlertDialogTitle>Update Role</AlertDialogTitle>
					<AlertDialogDescription>
						All the selected user will affect their role depending on the role
						you selected
					</AlertDialogDescription>
				</AlertDialogHeader>
				<DropdownRoles
					items={[
						"Administrator",
						"Supplier Chain",
						"Sales Agent",
						"Billing and Collection",
					]}
					setSelectedItem={setSelectedItem}
					selectedItem={selectedItem}
					label="Roles"
					key={"UpdateRoleDropdown"}
				/>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={handleContinue} disabled={isUpdating}>
						{isUpdating ? "Updating..." : "Continue"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default DemoteRole;
