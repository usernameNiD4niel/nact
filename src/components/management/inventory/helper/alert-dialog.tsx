import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { FC } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { MdOutlineError } from "react-icons/md";
import { Link } from "react-router-dom";

interface AlertDialogProps {
	error: string;
}

const AlertDialog: FC<AlertDialogProps> = ({ error }) => {
	return (
		<Dialog defaultOpen={true}>
			<DialogContent className={cn(error ? "text-red-500" : "text-green-500")}>
				<DialogHeader className="flex items-center justify-center gap-3">
					<div className="text-5xl">
						{error ? <MdOutlineError /> : <FaCircleCheck />}
					</div>
					<DialogTitle>
						{error ? "Failed to add" : "Successfully Created"}
					</DialogTitle>
					<DialogDescription className="max-w-sm text-center">
						{error ? error : "New data successfully added to the inventory."}
					</DialogDescription>
				</DialogHeader>
				<DialogClose asChild>
					<Link
						to={"/inventory"}
						className="bg-[#017DC3] hover:bg-[#017DC3]/90 text-center w-full py-2 text-white rounded-md">
						Go to inventory table
					</Link>
				</DialogClose>
			</DialogContent>
		</Dialog>
	);
};

export default AlertDialog;
