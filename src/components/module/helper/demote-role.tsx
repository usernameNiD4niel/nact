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

const DemoteRole = () => {
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
					label="Roles"
					key={"UpdateRoleDropdown"}
				/>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default DemoteRole;
