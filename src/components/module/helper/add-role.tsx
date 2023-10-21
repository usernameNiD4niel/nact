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

const AddRole = () => {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button className="fixed bottom-3 right-3 flex gap-2 items-center justify-center">
					<span>
						<MdGroupAdd />
					</span>
					<span>Assign</span>
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="max-w-md">
				<AlertDialogHeader>
					<AlertDialogTitle>Assign Role</AlertDialogTitle>
					<AlertDialogDescription>
						Please select a role of your selected user.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<DropdownRoles />
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default AddRole;
