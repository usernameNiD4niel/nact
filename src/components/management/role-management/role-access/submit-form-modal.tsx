import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { FaCircleCheck } from "react-icons/fa6";
import { MdOutlineError } from "react-icons/md";
import { Link } from "react-router-dom";

interface SubmitFormModalProps {
	isSuccess: boolean;
	title: string;
	description: string;
	to: string;
	linkText: string;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SubmitFormModal({
	description,
	isSuccess,
	linkText,
	title,
	to,
	setIsModalOpen,
}: SubmitFormModalProps) {
	const handleOpen = (isOpen: boolean) => {
		setIsModalOpen(!isOpen);
	};

	return (
		<Dialog defaultOpen={true} onOpenChange={handleOpen}>
			<DialogContent
				className={cn(isSuccess ? "text-green-500" : "text-red-500")}>
				<DialogHeader className="flex items-center justify-center gap-3">
					<div className="text-5xl">
						{isSuccess ? <FaCircleCheck /> : <MdOutlineError />}
					</div>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription className="max-w-sm text-center">
						{description}
					</DialogDescription>
				</DialogHeader>
				<DialogClose asChild>
					<Link
						to={to}
						className="bg-[#017DC3] hover:bg-[#017DC3]/90 text-center w-full py-2 text-white rounded-md">
						{linkText}
					</Link>
				</DialogClose>
			</DialogContent>
		</Dialog>
	);
}
