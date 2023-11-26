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
	hasAnError: boolean;
	title: string;
	description: string;
	href: string;
	linkText: string;
}

const AlertDialog: FC<AlertDialogProps> = ({
	hasAnError,
	title,
	description,
	href,
	linkText,
}) => {
	return (
		<Dialog defaultOpen={true}>
			<DialogContent
				className={cn(hasAnError ? "text-red-500" : "text-green-500")}>
				<DialogHeader className="flex items-center justify-center gap-3">
					<div className="text-5xl">
						{hasAnError ? <MdOutlineError /> : <FaCircleCheck />}
					</div>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription className="max-w-sm text-center">
						{description}
					</DialogDescription>
				</DialogHeader>
				<DialogClose asChild>
					<Link
						to={`/${href}`}
						className="bg-[#017DC3] hover:bg-[#017DC3]/90 text-center w-full py-2 text-white rounded-md">
						{linkText}
					</Link>
				</DialogClose>
			</DialogContent>
		</Dialog>
	);
};

export default AlertDialog;
